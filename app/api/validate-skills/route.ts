import { NextResponse } from 'next/server';

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function POST(request: Request) {
  let skills: string[] = [];
  
  try {
    const body = await request.json();
    skills = body.skills;

    if (!skills || !Array.isArray(skills)) {
      return NextResponse.json(
        { error: 'Invalid skills data provided' },
        { status: 400 }
      );
    }

    // If GEMINI_API_KEY is not configured, skip validation and return original skills
    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not configured - skipping skill validation');
      return NextResponse.json({ 
        validSkills: skills,
        skipped: true,
        message: 'Skill validation skipped - API key not configured'
      });
    }

    console.log('Validating skills:', skills);
    console.log('Using API key:', process.env.GEMINI_API_KEY.substring(0, 5) + '...');

    const prompt = `Given the following list of skills extracted from a CV, please analyze and return ONLY the valid technical and professional skills that are relevant to the job market. 
    Remove any non-skills, vague terms, or irrelevant information.
    Return the response as a JSON array of strings containing only the valid skills.
    
    Extracted skills: ${JSON.stringify(skills)}
    
    Response format:
    {
      "validSkills": ["skill1", "skill2", ...]
    }`;

    console.log('Sending request to Gemini API...');
    const response = await fetch(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          topP: 0.1,
          maxOutputTokens: 1000,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      
      // If quota exceeded or API error, return original skills instead of failing
      const errorMessage = errorData.error?.message || response.statusText;
      if (errorMessage.includes('quota') || errorMessage.includes('Quota')) {
        console.warn('Gemini API quota exceeded - returning original skills');
        return NextResponse.json({ 
          validSkills: skills,
          skipped: true,
          message: 'Skill validation skipped due to API quota limits'
        });
      }
      
      throw new Error(`Gemini API error: ${errorMessage}`);
    }

    const data = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Unexpected response format from Gemini API');
    }

    const content = data.candidates[0].content.parts[0].text;
    console.log('Received response from Gemini:', content);
    
    try {
      // Clean the response by removing markdown formatting
      const cleanedContent = content
        .replace(/```json\n?/g, '') // Remove ```json
        .replace(/```\n?/g, '') // Remove closing ```
        .trim(); // Remove any extra whitespace

      const parsedResponse = JSON.parse(cleanedContent);
      if (!parsedResponse.validSkills || !Array.isArray(parsedResponse.validSkills)) {
        console.error('Invalid response format from Gemini:', parsedResponse);
        return NextResponse.json({ validSkills: skills });
      }
      return NextResponse.json({ validSkills: parsedResponse.validSkills });
    } catch (e) {
      console.error('Error parsing Gemini response:', e);
      return NextResponse.json({ validSkills: skills });
    }
  } catch (error) {
    console.error('Detailed error in validate-skills:', error);
    // Return original skills instead of failing - this prevents CV upload from breaking
    return NextResponse.json({ 
      validSkills: skills,
      skipped: true,
      message: 'Skill validation skipped due to error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 