import { GoogleGenAI } from '@google/genai';
import foodModel from '../models/foodModel.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.json({ success: false, message: "Message is required" });
        }

        // Fetch all active food items
        const foods = await foodModel.find({});
        
        // Construct menu context
        const menuContext = foods.map(food => `- ${food.name} (Rs. ${food.price}) [${food.category}]: ${food.description}`).join('\n');
        
        const systemInstruction = `You are Tasto Chef Assistant, a premium digital sommelier and waiter for Tasto Food. Be elegant, helpful, and concise. Always keep your responses very concise (max 3-4 short sentences). When listing food items, use simple dashes (-) instead of asterisks, and always use explicit newline characters so it formats clearly as a list. Do not overwhelm the user with too many options; recommend a maximum of 3 to 4 best items. Here is our live menu:\n${menuContext}\nRecommend dishes strictly from this list based on user taste or budget. Do not recommend external items.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: message,
            config: {
                systemInstruction: systemInstruction,
            }
        });
        
        res.json({ success: true, response: response.text });
        
    } catch (error) {
        console.error("Chat Error:", error);
        res.json({ success: false, message: "Error communicating with AI Assistant" });
    }
}
