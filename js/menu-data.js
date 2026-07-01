const menuData = {
  restaurant: [

    // ===== HOT COFFEE =====
    { name: "Espresso", price: 39, category: "Hot Coffee", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500" },
    { name: "Americano", price: 59, category: "Hot Coffee", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500" },
    { name: "Cappuccino", price: 99, category: "Hot Coffee", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500" },
    { name: "Cafe Latte", price: 99, category: "Hot Coffee", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500" },
    { name: "Cafe Mocha", price: 109, category: "Hot Coffee", image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=500" },
    { name: "Vanilla Cappuccino", price: 119, category: "Hot Coffee", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500" },
    { name: "Hazelnut Cappuccino", price: 119, category: "Hot Coffee", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500" },
    { name: "Caramel Cappuccino", price: 119, category: "Hot Coffee", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500" },

    // ===== COLD COFFEE =====
    { name: "Cold Americano", price: 79, category: "Cold Coffee", image: "https://images.unsplash.com/photo-1517701600551-5aa6db14a3f5?w=500" },
    { name: "Iced Americano", price: 89, category: "Cold Coffee", image: "https://images.unsplash.com/photo-1517701600551-5aa6db14a3f5?w=500" },
    { name: "Coffee Mojito", price: 99, category: "Cold Coffee", image: "https://images.unsplash.com/photo-1517701600551-5aa6db14a3f5?w=500" },
    { name: "Cold Mocha", price: 99, category: "Cold Coffee", image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=500" },

    // ===== BLEND BREWS =====
    { name: "Cold Coffee", price: 99, category: "Blend Brews", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500" },
    { name: "Irish Cold Coffee", price: 109, category: "Blend Brews", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500" },
    { name: "Choco Frappe", price: 109, category: "Blend Brews", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500" },
    { name: "Hazelnut Cold Coffee", price: 119, category: "Blend Brews", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500" },
    { name: "Oreo Frappe", price: 119, category: "Blend Brews", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500" },
    { name: "Brownie Frappe", price: 129, category: "Blend Brews", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500" },
    { name: "Neuftella Cold Coffee", price: 129, category: "Blend Brews", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500" },
    { name: "Peanut Butter Cold Coffee", price: 40, category: "Blend Brews", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500" },

    // ===== SPECIAL HOT DRINKS =====
    { name: "CCD Filter Coffee", price: 20, category: "Special Drinks", image: "https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=500" },
    { name: "Black Coffee", price: 30, category: "Special Drinks", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500" },
    { name: "Hot Chocolate", price: 50, category: "Special Drinks", image: "https://images.unsplash.com/photo-1542990253-a781e04da0d5?w=500" },
    { name: "Badam Milk", price: 30, category: "Special Drinks", image: "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?w=500" },
    { name: "Turmeric Milk", price: 30, category: "Special Drinks", image: "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?w=500" },
    { name: "Pepper Milk", price: 30, category: "Special Drinks", image: "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?w=500" },
    { name: "Sonti Coffee", price: 40, category: "Special Drinks", image: "https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=500" },
    { name: "Horlicks", price: 30, category: "Special Drinks", image: "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?w=500" },
    { name: "Boost", price: 30, category: "Special Drinks", image: "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?w=500" },

    // ===== TEA & INFUSIONS =====
    { name: "Black Tea", price: 20, category: "Tea & Infusions", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500" },
    { name: "Green Tea", price: 25, category: "Tea & Infusions", image: "https://images.unsplash.com/photo-1627435601357-374b1e045af6?w=500" },
    { name: "Mint Tea", price: 25, category: "Tea & Infusions", image: "https://images.unsplash.com/photo-1627435601357-374b1e045af6?w=500" },
    { name: "Lemon Tea", price: 25, category: "Tea & Infusions", image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=500" },
    { name: "Bellam Tea", price: 30, category: "Tea & Infusions", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500" },
    { name: "Badam Tea", price: 30, category: "Tea & Infusions", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500" },
    { name: "Ginger Tea", price: 30, category: "Tea & Infusions", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500" },
    { name: "Elachi Tea", price: 30, category: "Tea & Infusions", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500" },
    { name: "Sonti Tea", price: 30, category: "Tea & Infusions", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500" },
    { name: "Masala Tea", price: 30, category: "Tea & Infusions", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500" },
    { name: "Peach Iced Tea", price: 80, category: "Tea & Infusions", image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=500" },
    { name: "Lemon Iced Tea", price: 80, category: "Tea & Infusions", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500" },

    // ===== MILK SHAKES =====
    { name: "Chocolate Shake", price: 99, category: "Milk Shakes", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500" },
    { name: "Vanilla Shake", price: 110, category: "Milk Shakes", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500" },
    { name: "Oreo Shake", price: 110, category: "Milk Shakes", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500" },
    { name: "KitKat Shake", price: 110, category: "Milk Shakes", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500" },
    { name: "Ferrero Rocher Shake", price: 139, category: "Milk Shakes", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500" },
    { name: "Dry Fruits Shake", price: 139, category: "Milk Shakes", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500" },

    // ===== SMOOTHIES =====
    { name: "Strawberry Smoothie", price: 79, category: "Smoothies", image: "https://images.unsplash.com/photo-1638883486369-b07dfe7bf0bc?w=500" },
    { name: "Mango Smoothie", price: 79, category: "Smoothies", image: "https://images.unsplash.com/photo-1638883486369-b07dfe7bf0bc?w=500" },
    { name: "Kiwi Smoothie", price: 79, category: "Smoothies", image: "https://images.unsplash.com/photo-1638883486369-b07dfe7bf0bc?w=500" },
    { name: "Orange Smoothie", price: 79, category: "Smoothies", image: "https://images.unsplash.com/photo-1638883486369-b07dfe7bf0bc?w=500" },
    { name: "Litchi Smoothie", price: 79, category: "Smoothies", image: "https://images.unsplash.com/photo-1638883486369-b07dfe7bf0bc?w=500" },
    { name: "Black Currant Smoothie", price: 79, category: "Smoothies", image: "https://images.unsplash.com/photo-1638883486369-b07dfe7bf0bc?w=500" },

    // ===== LASSI =====
    { name: "Sweet Lassi", price: 69, category: "Lassi", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500" },
    { name: "Banana Lassi", price: 79, category: "Lassi", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500" },

    // ===== MOCKTAILS & DRINKS =====
    { name: "Virgin Mojito", price: 59, category: "Mocktails & Drinks", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500" },
    { name: "Black Currant Mojito", price: 59, category: "Mocktails & Drinks", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500" },
    { name: "Kiwi Mojito", price: 59, category: "Mocktails & Drinks", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500" },
    { name: "Orange Mojito", price: 59, category: "Mocktails & Drinks", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500" },
    { name: "Blue Ocean", price: 59, category: "Mocktails & Drinks", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500" },
    { name: "Fresh Lime Soda", price: 40, category: "Mocktails & Drinks", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500" },
    { name: "Iced Tea", price: 40, category: "Mocktails & Drinks", image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=500" },
    { name: "Masala Soda", price: 50, category: "Mocktails & Drinks", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500" },
    { name: "Limca", price: 40, category: "Mocktails & Drinks", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500" },
    { name: "Maaza", price: 50, category: "Mocktails & Drinks", image: "https://images.unsplash.com/photo-1600271886742-f049cd5bba3f?w=500" },
    { name: "Sprite", price: 40, category: "Mocktails & Drinks", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500" },
    { name: "Coke", price: 40, category: "Mocktails & Drinks", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500" },

    // ===== OMELETTE =====
    { name: "Omelette", price: 70, category: "Omelette", image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=500" },
    { name: "Cheese Omelette", price: 80, category: "Omelette", image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=500" },
    { name: "Bread Omelette", price: 80, category: "Omelette", image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=500" },
    { name: "Cheese Bread Omelette", price: 90, category: "Omelette", image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=500" },

    // ===== MAGGI =====
    { name: "Veg Maggi", price: 70, category: "Maggi", image: "https://images.unsplash.com/photo-1645177628172-a788a2e7dabb?w=500" },
    { name: "Cheese Maggi", price: 90, category: "Maggi", image: "https://images.unsplash.com/photo-1645177628172-a788a2e7dabb?w=500" },
    { name: "Paneer Maggi", price: 109, category: "Maggi", image: "https://images.unsplash.com/photo-1645177628172-a788a2e7dabb?w=500" },
    { name: "Egg Maggi", price: 80, category: "Maggi", image: "https://images.unsplash.com/photo-1645177628172-a788a2e7dabb?w=500" },
    { name: "Egg Cheese Maggi", price: 90, category: "Maggi", image: "https://images.unsplash.com/photo-1645177628172-a788a2e7dabb?w=500" },
    { name: "Double Egg Maggi", price: 100, category: "Maggi", image: "https://images.unsplash.com/photo-1645177628172-a788a2e7dabb?w=500" },
    { name: "Double Egg Cheese Maggi", price: 110, category: "Maggi", image: "https://images.unsplash.com/photo-1645177628172-a788a2e7dabb?w=500" },
    { name: "Chicken Maggi", price: 109, category: "Maggi", image: "https://images.unsplash.com/photo-1645177628172-a788a2e7dabb?w=500" },
    { name: "Double Egg Chicken Maggi", price: 120, category: "Maggi", image: "https://images.unsplash.com/photo-1645177628172-a788a2e7dabb?w=500" },
    { name: "Double Egg Chicken Cheese Maggi", price: 130, category: "Maggi", image: "https://images.unsplash.com/photo-1645177628172-a788a2e7dabb?w=500" },

    // ===== SANDWICHES & PANINIS =====
    { name: "Veg Sandwich", price: 70, category: "Sandwiches & Paninis", image: "https://images.unsplash.com/photo-1538220856186-0be0c085984d?w=500" },
    { name: "Cheese Sandwich", price: 90, category: "Sandwiches & Paninis", image: "https://images.unsplash.com/photo-1538220856186-0be0c085984d?w=500" },
    { name: "Paneer Sandwich", price: 129, category: "Sandwiches & Paninis", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" },
    { name: "Egg Sandwich", price: 90, category: "Sandwiches & Paninis", image: "https://images.unsplash.com/photo-1538220856186-0be0c085984d?w=500" },
    { name: "Cheese Egg Sandwich", price: 109, category: "Sandwiches & Paninis", image: "https://images.unsplash.com/photo-1538220856186-0be0c085984d?w=500" },
    { name: "Chicken Sandwich", price: 149, category: "Sandwiches & Paninis", image: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=500" },
    { name: "CCD Club Sandwich", price: 159, category: "Sandwiches & Paninis", image: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=500" },
    { name: "Extra Cheese", price: 25, category: "Sandwiches & Paninis", image: "https://images.unsplash.com/photo-1538220856186-0be0c085984d?w=500" },

    // ===== ROLLS =====
    { name: "Veg Roll", price: 70, category: "Rolls", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500" },
    { name: "Paneer Roll", price: 70, category: "Rolls", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500" },
    { name: "Single Egg Roll", price: 80, category: "Rolls", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500" },
    { name: "Double Egg Roll", price: 90, category: "Rolls", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500" },
    { name: "Single Egg Cheese Roll", price: 90, category: "Rolls", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500" },
    { name: "Double Egg Cheese Roll", price: 100, category: "Rolls", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500" },
    { name: "Chicken Roll", price: 100, category: "Rolls", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500" },
    { name: "Chicken Cheese Roll", price: 109, category: "Rolls", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500" },
    { name: "Egg Chicken Roll", price: 109, category: "Rolls", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500" },
    { name: "Double Egg Chicken Roll", price: 110, category: "Rolls", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500" },
    { name: "Double Egg Chicken Cheese Roll", price: 120, category: "Rolls", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500" },

    // ===== WAFFLES & PANCAKES =====
    { name: "Waffles", price: 99, category: "Waffles & Pancakes", image: "https://images.unsplash.com/photo-1562376502-6f769499c886?w=500" },
    { name: "Chocolate Waffles", price: 129, category: "Waffles & Pancakes", image: "https://images.unsplash.com/photo-1562376502-6f769499c886?w=500" },
    { name: "Pancake", price: 99, category: "Waffles & Pancakes", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500" },
    { name: "Chocolate Pancake", price: 129, category: "Waffles & Pancakes", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500" },

    // ===== FRIED FOOD =====
    { name: "French Fries", price: 99, category: "Fried Food", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500" },
    { name: "Peri Peri Fries", price: 109, category: "Fried Food", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500" },
    { name: "Cheese Loaded Fries", price: 139, category: "Fried Food", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500" },
    { name: "Nachos with Salsa", price: 69, category: "Fried Food", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500" },
    { name: "Cheese Nachos", price: 89, category: "Fried Food", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500" },
    { name: "Fried Chicken Cheese Nachos", price: 199, category: "Fried Food", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500" },
    { name: "Cheese Chilli Toast (8pcs)", price: 109, category: "Fried Food", image: "https://images.unsplash.com/photo-1573145959956-e9fae6b8bd42?w=500" },
    { name: "Chicken Cheese Chilli Toast", price: 129, category: "Fried Food", image: "https://images.unsplash.com/photo-1573145959956-e9fae6b8bd42?w=500" },
    { name: "Chicken Fries", price: 199, category: "Fried Food", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500" },
    { name: "Chicken Cheese Loaded Fries", price: 239, category: "Fried Food", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500" },

    // ===== SIDES & SNACKS =====
    { name: "Veg Nuggets (6pcs)", price: 99, category: "Sides & Snacks", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500" },
    { name: "Veg Nuggets (16pcs)", price: 189, category: "Sides & Snacks", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500" },
    { name: "Onion Rings (6pcs)", price: 89, category: "Sides & Snacks", image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=500" },
    { name: "Cheese Shots (10pcs)", price: 99, category: "Sides & Snacks", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" },
    { name: "Veg Corn Samosa (4pcs)", price: 109, category: "Sides & Snacks", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500" },
    { name: "Chilli Garlic Potato Shots (12pcs)", price: 109, category: "Sides & Snacks", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500" },
    { name: "Veg Spring Rolls (6pcs)", price: 79, category: "Sides & Snacks", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" },
    { name: "Crispy Corn", price: 89, category: "Sides & Snacks", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" },
    { name: "Garlic Bread", price: 90, category: "Sides & Snacks", image: "https://images.unsplash.com/photo-1573145959956-e9fae6b8bd42?w=500" },
    { name: "Garlic Bread with Cheese", price: 120, category: "Sides & Snacks", image: "https://images.unsplash.com/photo-1573145959956-e9fae6b8bd42?w=500" },

    // ===== FRIED CHICKEN =====
    { name: "Chicken Popcorn (12pcs)", price: 159, category: "Fried Chicken", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500" },
    { name: "Chicken Popcorn (20pcs)", price: 250, category: "Fried Chicken", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500" },
    { name: "Chicken Strips (4pcs)", price: 160, category: "Fried Chicken", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500" },
    { name: "Chicken Strips (8pcs)", price: 300, category: "Fried Chicken", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500" },
    { name: "Chicken Nuggets (8pcs)", price: 130, category: "Fried Chicken", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500" },
    { name: "Chicken Lollipops (4pcs)", price: 140, category: "Fried Chicken", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500" },
    { name: "Chicken Lollipops (8pcs)", price: 260, category: "Fried Chicken", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500" },
    { name: "Chicken Wings (4pcs)", price: 130, category: "Fried Chicken", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500" },
    { name: "Chicken Wings (8pcs)", price: 230, category: "Fried Chicken", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500" },
    { name: "Chicken Legs (2pcs)", price: 210, category: "Fried Chicken", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500" },
    { name: "Chicken Legs (4pcs)", price: 430, category: "Fried Chicken", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500" },
    { name: "Chicken Legs (8pcs)", price: 810, category: "Fried Chicken", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500" },
    { name: "Fish Fingers (6pcs)", price: 159, category: "Fried Chicken", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500" },

    // ===== MOMO'S & SAMOSA =====
    { name: "Veg Momo's (6pcs)", price: 129, category: "Momo's & Samosa", image: "https://images.unsplash.com/photo-1534422298391-e4f8517b9ff4?w=500" },
    { name: "Chicken Momo's (6pcs)", price: 159, category: "Momo's & Samosa", image: "https://images.unsplash.com/photo-1534422298391-e4f8517b9ff4?w=500" },
    { name: "Corn Samosa (4pcs)", price: 49, category: "Momo's & Samosa", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500" },

    // ===== PASTA & PIZZA =====
    { name: "Penne Pasta Veg (Arrabiata)", price: 139, category: "Pasta & Pizza", image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=500" },
    { name: "Penne Pasta Veg (Alfredo)", price: 139, category: "Pasta & Pizza", image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500" },
    { name: "Penne Pasta Veg (Pink Sauce)", price: 139, category: "Pasta & Pizza", image: "https://images.unsplash.com/photo-1555939594-58d7cb561d1b?w=500" },
    { name: "Chicken Pasta", price: 169, category: "Pasta & Pizza", image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=500" },
    { name: "Veg Pizza (8 inch)", price: 169, category: "Pasta & Pizza", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500" },
    { name: "Margarita Pizza (10 inch)", price: 199, category: "Pasta & Pizza", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500" },
    { name: "Veg Pizza (10 inch)", price: 199, category: "Pasta & Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
    { name: "Corn Cheese Pizza (10 inch)", price: 209, category: "Pasta & Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
    { name: "Garden Exotic Pizza (10 inch)", price: 209, category: "Pasta & Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
    { name: "Non Veg Pizza (10 inch)", price: 229, category: "Pasta & Pizza", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500" },
    { name: "Paneer Exotic Pizza (10 inch)", price: 239, category: "Pasta & Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
    { name: "Roasted Chicken Pizza (10 inch)", price: 259, category: "Pasta & Pizza", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500" },
    { name: "Spicy Mexican Chicken Pizza (10 inch)", price: 259, category: "Pasta & Pizza", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500" },

    // ===== BURGERS =====
    { name: "Veg Cheese Burger", price: 79, category: "Burgers", image: "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=500" },
    { name: "Aloo Tikki Burger", price: 79, category: "Burgers", image: "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=500" },
    { name: "Paneer Burger", price: 89, category: "Burgers", image: "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=500" },
    { name: "Egg Burger", price: 109, category: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
    { name: "Crispy Chicken Burger", price: 119, category: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
    { name: "Chicken Burger", price: 149, category: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
    { name: "CCD Signature Burger", price: 149, category: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },

    // ===== DESSERTS =====
    { name: "Chocolate Brownie", price: 99, category: "Desserts", image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500" },
    { name: "Chocolate Smokin Brownie", price: 150, category: "Desserts", image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500" },
    { name: "Choco Lava Cake", price: 100, category: "Desserts", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500" },
    { name: "Blueberry Cheesecake (Slice)", price: 150, category: "Desserts", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500" },
    { name: "New York Cheesecake (Slice)", price: 140, category: "Desserts", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500" },
    { name: "Afogato", price: 69, category: "Desserts", image: "https://images.unsplash.com/photo-1560008511-11c63416e52d?w=500" },

    // ===== ICE CREAMS =====
    { name: "Vanilla Ice Cream", price: 59, category: "Ice Creams", image: "https://images.unsplash.com/photo-1560008511-11c63416e52d?w=500" },
    { name: "Butter Scotch Ice Cream", price: 69, category: "Ice Creams", image: "https://images.unsplash.com/photo-1560008511-11c63416e52d?w=500" },
    { name: "Strawberry Ice Cream", price: 69, category: "Ice Creams", image: "https://images.unsplash.com/photo-1560008511-11c63416e52d?w=500" },
    { name: "Chocolate Ice Cream", price: 79, category: "Ice Creams", image: "https://images.unsplash.com/photo-1560008511-11c63416e52d?w=500" },
    { name: "Pista Ice Cream", price: 79, category: "Ice Creams", image: "https://images.unsplash.com/photo-1560008511-11c63416e52d?w=500" },
    { name: "Black Currant Ice Cream", price: 89, category: "Ice Creams", image: "https://images.unsplash.com/photo-1560008511-11c63416e52d?w=500" },
    { name: "Dry Fruits Ice Cream", price: 99, category: "Ice Creams", image: "https://images.unsplash.com/photo-1560008511-11c63416e52d?w=500" },

    // ===== COMBO OFFERS =====
    { name: "Snack Combo", price: 179, category: "Combo Offers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
    { name: "Pizza Combo", price: 349, category: "Combo Offers", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
    { name: "Chicken Combo", price: 379, category: "Combo Offers", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500" },

  ],
  foodcourt: []
};

menuData.foodcourt = menuData.restaurant;
