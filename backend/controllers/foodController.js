import foodModel from "../models/foodModel.js";
import fs from 'fs'

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// add food
const addFood = async (req, res) => {

    try {
        let image_filename = `${req.file.filename}`

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category:req.body.category,
            image: image_filename,
        })

        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// delete food
const removeFood = async (req, res) => {
    try {

        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

const seedFood = async (req, res) => {
    try {
        const count = await foodModel.countDocuments({});
        if (count > 0) {
            return res.json({ success: true, message: "Database already seeded with food items", count });
        }

        const initialFoods = [
            { name: "Greek salad", image: "food_1.png", price: 1250, description: "Food provides essential nutrients for overall health and well-being", category: "Salad" },
            { name: "Veg salad", image: "food_2.png", price: 950, description: "Food provides essential nutrients for overall health and well-being", category: "Salad" },
            { name: "Clover Salad", image: "food_3.png", price: 1100, description: "Food provides essential nutrients for overall health and well-being", category: "Salad" },
            { name: "Chicken Salad", image: "food_4.png", price: 1650, description: "Food provides essential nutrients for overall health and well-being", category: "Salad" },
            { name: "Lasagna Rolls", image: "food_5.png", price: 1350, description: "Food provides essential nutrients for overall health and well-being", category: "Rolls" },
            { name: "Peri Peri Rolls", image: "food_6.png", price: 1250, description: "Food provides essential nutrients for overall health and well-being", category: "Rolls" },
            { name: "Chicken Rolls", image: "food_7.png", price: 900, description: "Food provides essential nutrients for overall health and well-being", category: "Rolls" },
            { name: "Veg Rolls", image: "food_8.png", price: 700, description: "Food provides essential nutrients for overall health and well-being", category: "Rolls" },
            { name: "Ripple Ice Cream", image: "food_9.png", price: 600, description: "Food provides essential nutrients for overall health and well-being", category: "Deserts" },
            { name: "Fruit Ice Cream", image: "food_10.png", price: 650, description: "Food provides essential nutrients for overall health and well-being", category: "Deserts" },
            { name: "Jar Ice Cream", image: "food_11.png", price: 650, description: "Food provides essential nutrients for overall health and well-being", category: "Deserts" },
            { name: "Vanilla Ice Cream", image: "food_12.png", price: 550, description: "Food provides essential nutrients for overall health and well-being", category: "Deserts" },
            { name: "Chicken Sandwich", image: "food_13.png", price: 950, description: "Food provides essential nutrients for overall health and well-being", category: "Sandwich" },
            { name: "Vegan Sandwich", image: "food_14.png", price: 850, description: "Food provides essential nutrients for overall health and well-being", category: "Sandwich" },
            { name: "Grilled Sandwich", image: "food_15.png", price: 1100, description: "Food provides essential nutrients for overall health and well-being", category: "Sandwich" },
            { name: "Bread Sandwich", image: "food_16.png", price: 700, description: "Food provides essential nutrients for overall health and well-being", category: "Sandwich" },
            { name: "Cup Cake", image: "food_17.png", price: 400, description: "Food provides essential nutrients for overall health and well-being", category: "Cake" },
            { name: "Vegan Cake", image: "food_18.png", price: 750, description: "Food provides essential nutrients for overall health and well-being", category: "Cake" },
            { name: "Butterscotch Cake", image: "food_19.png", price: 1200, description: "Food provides essential nutrients for overall health and well-being", category: "Cake" },
            { name: "Sliced Cake", image: "food_20.png", price: 600, description: "Food provides essential nutrients for overall health and well-being", category: "Cake" },
            { name: "Garlic Mushroom ", image: "food_21.png", price: 1000, description: "Food provides essential nutrients for overall health and well-being", category: "Pure Veg" },
            { name: "Fried Cauliflower", image: "food_22.png", price: 1100, description: "Food provides essential nutrients for overall health and well-being", category: "Pure Veg" },
            { name: "Mix Veg Pulao", image: "food_23.png", price: 900, description: "Food provides essential nutrients for overall health and well-being", category: "Pure Veg" },
            { name: "Rice Zucchini", image: "food_24.png", price: 950, description: "Food provides essential nutrients for overall health and well-being", category: "Pure Veg" },
            { name: "Cheese Pasta", image: "food_25.png", price: 1100, description: "Food provides essential nutrients for overall health and well-being", category: "Pasta" },
            { name: "Tomato Pasta", image: "food_26.png", price: 1250, description: "Food provides essential nutrients for overall health and well-being", category: "Pasta" },
            { name: "Creamy Pasta", image: "food_27.png", price: 1450, description: "Food provides essential nutrients for overall health and well-being", category: "Pasta" },
            { name: "Chicken Pasta", image: "food_28.png", price: 1650, description: "Food provides essential nutrients for overall health and well-being", category: "Pasta" },
            { name: "Buttter Noodles", image: "food_29.png", price: 959, description: "Food provides essential nutrients for overall health and well-being", category: "Noodles" },
            { name: "Veg Noodles", image: "food_30.png", price: 900, description: "Food provides essential nutrients for overall health and well-being", category: "Noodles" },
            { name: "Somen Noodles", image: "food_31.png", price: 1200, description: "Food provides essential nutrients for overall health and well-being", category: "Noodles" },
            { name: "Cooked Noodles", image: "food_32.png", price: 1000, description: "Food provides essential nutrients for overall health and well-being", category: "Noodles" }
        ];

        await foodModel.insertMany(initialFoods);
        res.json({ success: true, message: "Database successfully seeded with 32 food items!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error seeding food database" });
    }
}

export { listFood, addFood, removeFood, seedFood }