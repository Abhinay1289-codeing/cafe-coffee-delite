const menuData = {
  restaurant: [
    {
        "name": "veg Burger",
        "price": 79,
        "category": "Burgers",
        "image": "assets/images/veg-burger.webp"
    },
    {
        "name": "Aloo Tikki Burger",
        "price": 79,
        "category": "Burgers",
        "image": "assets/images/aloo-tikki-burger.webp"
    },
    {
        "name": "Veg Cheese Burger",
        "price": 99,
        "category": "Burgers",
        "image": "assets/images/veg-cheese-burger.webp"
    },
    {
        "name": "Paneer Burger",
        "price": 119,
        "category": "Burgers",
        "image": "assets/images/paneer-burger.webp"
    },
    {
        "name": "Egg Burger",
        "price": 99,
        "category": "Burgers",
        "image": "assets/images/egg-burger.webp"
    },
    {
        "name": "Chicken Burger",
        "price": 129,
        "category": "Burgers",
        "image": "assets/images/chicken-burger.webp"
    },
    {
        "name": "Chicken Cheese Burger",
        "price": 149,
        "category": "Burgers",
        "image": "assets/images/chicken-cheese-burger.webp"
    },
    {
        "name": "Crispy Chicken Burger",
        "price": 149,
        "category": "Burgers",
        "image": "assets/images/crispy-chicken-burger.webp"
    },
    {
        "name": "CCD Chicken Burger (Served with Fries)",
        "price": 169,
        "category": "Burgers",
        "image": "assets/images/ccd-chicken-burger.webp"
    },
    {
        "name": "Snack Combo",
        "price": 179,
        "category": "Combo Offers",
        "description": "Corn Samosa + Veg Burger + Ocean Mojito",
        "image": "assets/images/snack-combo.webp"
    },
    {
        "name": "Pizza Combo",
        "price": 349,
        "category": "Combo Offers",
        "description": "French Fries + Veg Pizza + Virgin Mojito",
        "image": "assets/images/pizza-combo.webp"
    },
    {
        "name": "Chicken Combo",
        "price": 379,
        "category": "Combo Offers",
        "description": "Chicken Popcorn + Chicken Sandwich + Caramel Mojito",
        "image": "assets/images/chicken-combo.webp"
    },
    {
        "name": "Corn Samosa (4 Pcs)",
        "price": 49,
        "category": "Samosas & Momos",
        "image": "assets/images/corn-samosa.webp"
    },
    {
        "name": "Chicken Samosa (4 Pcs)",
        "price": 79,
        "category": "Samosas & Momos",
        "image": "assets/images/chicken-samosa.webp"
    },
    {
        "name": "Veg Momos (Steamed/Fried) (5 Pcs)",
        "price": 139,
        "category": "Samosas & Momos",
        "image": "assets/images/veg-momos.webp"
    },
    {
        "name": "Chicken Momos (Steamed/Fried) (5 Pcs)",
        "price": 169,
        "category": "Samosas & Momos",
        "image": "assets/images/chicken-momos.webp"
    },
    {
        "name": "Tea",
        "price": 30,
        "category": "Teas",
        "image": "assets/images/tea.webp"
    },
    {
        "name": "Black Tea",
        "price": 20,
        "category": "Teas",
        "image": "assets/images/black-tea.webp"
    },
    {
        "name": "Green Tea",
        "price": 39,
        "category": "Teas",
        "image": "assets/images/green-tea.webp"
    },
    {
        "name": "Mint Tea",
        "price": 30,
        "category": "Teas",
        "image": "assets/images/mint-tea.webp"
    },
    {
        "name": "Lemon Tea",
        "price": 30,
        "category": "Teas",
        "image": "assets/images/lemon-tea.webp"
    },
    {
        "name": "Bellam Tea (Jaggery Tea)",
        "price": 49,
        "category": "Teas",
        "image": "assets/images/bellam-tea.webp"
    },
    {
        "name": "Badam Tea",
        "price": 49,
        "category": "Teas",
        "image": "assets/images/badam-tea.webp"
    },
    {
        "name": "Ginger Tea",
        "price": 49,
        "category": "Teas",
        "image": "assets/images/ginger-tea.webp"
    },
    {
        "name": "Elaichi Tea",
        "price": 49,
        "category": "Teas",
        "image": "assets/images/elaichi-tea.webp"
    },
    {
        "name": "Sonti Tea (Dry Ginger Tea)",
        "price": 49,
        "category": "Teas",
        "image": "assets/images/sonti-tea.webp"
    },
    {
        "name": "Masala Tea",
        "price": 69,
        "category": "Teas",
        "image": "assets/images/masala-tea.webp"
    },
    {
        "name": "Milk",
        "price": 25,
        "category": "Hot Beverages",
        "image": "assets/images/milk.webp"
    },
    {
        "name": "Black Coffee",
        "price": 30,
        "category": "Hot Beverages",
        "image": "assets/images/black-coffee.webp"
    },
    {
        "name": "Coffee",
        "price": 40,
        "category": "Hot Beverages",
        "image": "assets/images/coffee.webp"
    },
    {
        "name": "Pepper Milk",
        "price": 39,
        "category": "Hot Beverages",
        "image": "assets/images/pepper-milk.webp"
    },
    {
        "name": "Turmeric Milk",
        "price": 39,
        "category": "Hot Beverages",
        "image": "assets/images/turmeric-milk.webp"
    },
    {
        "name": "Badam Milk",
        "price": 39,
        "category": "Hot Beverages",
        "image": "assets/images/badam-milk.webp"
    },
    {
        "name": "Horlicks",
        "price": 39,
        "category": "Hot Beverages",
        "image": "assets/images/horlicks.webp"
    },
    {
        "name": "Boost",
        "price": 39,
        "category": "Hot Beverages",
        "image": "assets/images/boost.webp"
    },
    {
        "name": "Sonti Coffee",
        "price": 49,
        "category": "Hot Beverages",
        "image": "assets/images/sonti-coffee.webp"
    },
    {
        "name": "CCD Special Filter Coffee",
        "price": 69,
        "category": "Hot Beverages",
        "image": "assets/images/ccd-special-filter-coffee.webp"
    },
    {
        "name": "Hot Chocolate",
        "price": 89,
        "category": "Hot Beverages",
        "image": "assets/images/hot-chocolate.webp"
    },
    {
        "name": "Espresso",
        "price": 59,
        "category": "Hot Brews",
        "image": "assets/images/espresso.webp"
    },
    {
        "name": "Americano",
        "price": 79,
        "category": "Hot Brews",
        "image": "assets/images/americano.webp"
    },
    {
        "name": "Cappuccino",
        "price": 99,
        "category": "Hot Brews",
        "image": "assets/images/cappuccino.webp"
    },
    {
        "name": "Café Latte",
        "price": 119,
        "category": "Hot Brews",
        "image": "assets/images/cafe-latte.webp"
    },
    {
        "name": "Café Mocha",
        "price": 129,
        "category": "Hot Brews",
        "image": "assets/images/cafe-mocha.webp"
    },
    {
        "name": "Hazelnut Cappuccino",
        "price": 129,
        "category": "Hot Brews",
        "image": "assets/images/hazelnut-cappuccino.webp"
    },
    {
        "name": "Vanilla Cappuccino",
        "price": 129,
        "category": "Hot Brews",
        "image": "assets/images/vanilla-cappuccino.webp"
    },
    {
        "name": "Caramel Cappuccino",
        "price": 129,
        "category": "Hot Brews",
        "image": "assets/images/caramel-cappuccino.webp"
    },
    {
        "name": "Iced Americano",
        "price": 99,
        "category": "Cold Brews",
        "image": "assets/images/iced-americano.webp"
    },
    {
        "name": "Coffee Mojito",
        "price": 99,
        "category": "Cold Brews",
        "image": "assets/images/coffee-mojito.webp"
    },
    {
        "name": "Cold Mocha",
        "price": 119,
        "category": "Cold Brews",
        "image": "assets/images/cold-mocha.webp"
    },
    {
        "name": "Cold Coffee",
        "price": 119,
        "category": "Blended Brews",
        "image": "assets/images/cold-coffee.webp"
    },
    {
        "name": "Irish Cold Coffee",
        "price": 129,
        "category": "Blended Brews",
        "image": "assets/images/irish-cold-coffee.webp"
    },
    {
        "name": "Hazelnut Cold Coffee",
        "price": 129,
        "category": "Blended Brews",
        "image": "assets/images/hazelnut-cold-coffee.webp"
    },
    {
        "name": "Choco Frappe",
        "price": 139,
        "category": "Blended Brews",
        "image": "assets/images/choco-frappe.webp"
    },
    {
        "name": "Oreo Frappe",
        "price": 139,
        "category": "Blended Brews",
        "image": "assets/images/oreo-frappe.webp"
    },
    {
        "name": "Brownie Frappe",
        "price": 139,
        "category": "Blended Brews",
        "image": "assets/images/brownie-frappe.webp"
    },
    {
        "name": "Nutella Cold Coffee",
        "price": 139,
        "category": "Blended Brews",
        "image": "assets/images/nutella-cold-coffee.webp"
    },
    {
        "name": "Peanut Butter Cold Coffee",
        "price": 139,
        "category": "Blended Brews",
        "image": "assets/images/peanut-butter-cold-coffee.webp"
    },
    {
        "name": "Chocolate Milkshake",
        "price": 99,
        "category": "Milk Shakes",
        "image": "assets/images/chocolate-milkshake.webp"
    },
    {
        "name": "Vanilla Milkshake",
        "price": 99,
        "category": "Milk Shakes",
        "image": "assets/images/vanilla-milkshake.webp"
    },
    {
        "name": "Oreo Milkshake",
        "price": 119,
        "category": "Milk Shakes",
        "image": "assets/images/oreo-milkshake.webp"
    },
    {
        "name": "KitKat Milkshake",
        "price": 119,
        "category": "Milk Shakes",
        "image": "assets/images/kitkat-milkshake.webp"
    },
    {
        "name": "Ferrero Rocher Milkshake",
        "price": 139,
        "category": "Milk Shakes",
        "image": "assets/images/ferrero-rocher-milkshake.webp"
    },
    {
        "name": "Dry Fruits Milkshake",
        "price": 139,
        "category": "Milk Shakes",
        "image": "assets/images/dry-fruits-milkshake.webp"
    },
    {
        "name": "Coke",
        "price": 39,
        "category": "Soft Drinks",
        "image": "assets/images/coke.webp"
    },
    {
        "name": "thumpsup",
        "price": 39,
        "category": "Soft Drinks",
        "image": "assets/images/thumpsup.webp"
    },
    {
        "name": "Sprite",
        "price": 39,
        "category": "Soft Drinks",
        "image": "assets/images/sprite.webp"
    },
    {
        "name": "Masala Soda",
        "price": 59,
        "category": "Soft Drinks",
        "image": "assets/images/masala-soda.webp"
    },
    {
        "name": "Fresh Lime Soda (Sweet / Salt)",
        "price": 50,
        "category": "Mocktails",
        "image": "assets/images/fresh-lime-soda.webp"
    },
    {
        "name": "Lime and Mint",
        "price": 79,
        "category": "Mocktails",
        "image": "assets/images/lime-and-mint.webp"
    },
    {
        "name": "Iced Tea",
        "price": 79,
        "category": "Mocktails",
        "image": "assets/images/iced-tea.webp"
    },
    {
        "name": "Virgin Mojito",
        "price": 79,
        "category": "Mocktails",
        "image": "assets/images/virgin-mojito.webp"
    },
    {
        "name": "Kiwi Mojito",
        "price": 79,
        "category": "Mocktails",
        "image": "assets/images/kiwi-mojito.webp"
    },
    {
        "name": "Black Currant Mojito",
        "price": 79,
        "category": "Mocktails",
        "image": "assets/images/black-currant-mojito.webp"
    },
    {
        "name": "Orange Mojito",
        "price": 69,
        "category": "Mocktails",
        "image": "assets/images/orange-mojito.webp"
    },
    {
        "name": "Blue Ocean",
        "price": 79,
        "category": "Mocktails",
        "image": "assets/images/blue-ocean.webp"
    },
    {
        "name": "Sweet Lassi",
        "price": 69,
        "category": "Lassis",
        "image": "assets/images/sweet-lassi.webp"
    },
    {
        "name": "Butter Milk",
        "price": 69,
        "category": "Lassis",
        "image": "assets/images/butter-milk.webp"
    },
    {
        "name": "Banana Lassi",
        "price": 79,
        "category": "Lassis",
        "image": "assets/images/banana-lassi.webp"
    },
    {
        "name": "Omelette",
        "price": 79,
        "category": "Omelettes",
        "image": "assets/images/omelette.webp"
    },
    {
        "name": "Cheese Omelette",
        "price": 99,
        "category": "Omelettes",
        "image": "assets/images/cheese-omelette.webp"
    },
    {
        "name": "Bread Omelette",
        "price": 99,
        "category": "Omelettes",
        "image": "assets/images/bread-omelette.webp"
    },
    {
        "name": "Cheese Bread Omelette",
        "price": 119,
        "category": "Omelettes",
        "image": "assets/images/cheese-bread-omelette.webp"
    },
    {
        "name": "Veg Maggi",
        "price": 89,
        "category": "Maggi",
        "image": "assets/images/veg-maggi.webp"
    },
    {
        "name": "Cheese Maggi",
        "price": 119,
        "category": "Maggi",
        "image": "assets/images/cheese-maggi.webp"
    },
    {
        "name": "Paneer Maggi",
        "price": 129,
        "category": "Maggi",
        "image": "assets/images/paneer-maggi.webp"
    },
    {
        "name": "Egg Maggi",
        "price": 99,
        "category": "Maggi",
        "image": "assets/images/egg-maggi.webp"
    },
    {
        "name": "Double Egg Maggi",
        "price": 129,
        "category": "Maggi",
        "image": "assets/images/double-egg-maggi.webp"
    },
    {
        "name": "Chicken Maggi",
        "price": 139,
        "category": "Maggi",
        "image": "assets/images/chicken-maggi.webp"
    },
    {
        "name": "Double Egg Cheese Maggi",
        "price": 149,
        "category": "Maggi",
        "image": "assets/images/double-egg-cheese-maggi.webp"
    },
    {
        "name": "Chicken Cheese Maggi",
        "price": 159,
        "category": "Maggi",
        "image": "assets/images/chicken-cheese-maggi.webp"
    },
    {
        "name": "Double Egg Chicken Maggi",
        "price": 149,
        "category": "Maggi",
        "image": "assets/images/double-egg-chicken-maggi.webp"
    },
    {
        "name": "Double Egg Chicken Cheese Maggi",
        "price": 169,
        "category": "Maggi",
        "image": "assets/images/double-egg-chicken-cheese-maggi.webp"
    },
    {
        "name": "Veg Sandwich",
        "price": 89,
        "category": "Sandwiches",
        "image": "assets/images/veg-sandwich.webp"
    },
    {
        "name": "Cheese Sandwich",
        "price": 119,
        "category": "Sandwiches",
        "image": "assets/images/cheese-sandwich.webp"
    },
    {
        "name": "Paneer Sandwich",
        "price": 129,
        "category": "Sandwiches",
        "image": "assets/images/paneer-sandwich.webp"
    },
    {
        "name": "Egg Sandwich",
        "price": 119,
        "category": "Sandwiches",
        "image": "assets/images/egg-sandwich.webp"
    },
    {
        "name": "Cheese Egg Sandwich",
        "price": 139,
        "category": "Sandwiches",
        "image": "assets/images/cheese-egg-sandwich.webp"
    },
    {
        "name": "Chicken Sandwich",
        "price": 139,
        "category": "Sandwiches",
        "image": "assets/images/chicken-sandwich.webp"
    },
    {
        "name": "CCD Club Sandwich (Served with Fries)",
        "price": 179,
        "category": "Sandwiches",
        "image": "assets/images/ccd-club-sandwich.webp"
    },
    {
        "name": "Extra Cheese (Add-on)",
        "price": 25,
        "category": "Sandwiches",
        "image": "assets/images/extra-cheese.webp"
    },
    {
        "name": "Classic Waffle",
        "price": 129,
        "category": "Waffles & Pancakes",
        "image": "assets/images/classic-waffle.webp"
    },
    {
        "name": "Classic Pancake",
        "price": 129,
        "category": "Waffles & Pancakes",
        "image": "assets/images/classic-pancake.webp"
    },
    {
        "name": "Chocolate Waffle",
        "price": 149,
        "category": "Waffles & Pancakes",
        "image": "assets/images/chocolate-waffle.webp"
    },
    {
        "name": "Chocolate Pancake",
        "price": 149,
        "category": "Waffles & Pancakes",
        "image": "assets/images/chocolate-pancake.webp"
    },
    {
        "name": "Nachos with Salsa",
        "price": 99,
        "category": "Fried Food & Quick Bites",
        "image": "assets/images/nachos-with-salsa.webp"
    },
    {
        "name": "Onion Rings (6 Pcs)",
        "price": 99,
        "category": "Fried Food & Quick Bites",
        "image": "assets/images/onion-rings.webp"
    },
    {
        "name": "Veg Spring Roll (6 Pcs)",
        "price": 99,
        "category": "Fried Food & Quick Bites",
        "image": "assets/images/veg-spring-roll.webp"
    },
    {
        "name": "Crispy Corn",
        "price": 99,
        "category": "Fried Food & Quick Bites",
        "image": "assets/images/crispy-corn.webp"
    },
    {
        "name": "French Fries",
        "price": 99,
        "category": "Fried Food & Quick Bites",
        "image": "assets/images/french-fries.webp"
    },
    {
        "name": "Cheese Nachos",
        "price": 119,
        "category": "Fried Food & Quick Bites",
        "image": "assets/images/cheese-nachos.webp"
    },
    {
        "name": "Veg Nuggets (6 Pcs)",
        "price": 99,
        "category": "Fried Food & Quick Bites",
        "image": "assets/images/veg-nuggets.webp"
    },
    {
        "name": "Cheese Shots (6 Pcs)",
        "price": 99,
        "category": "Fried Food & Quick Bites",
        "image": "assets/images/cheese-shots.webp"
    },
    {
        "name": "Chilli Garlic Potato Shots (10 Pcs)",
        "price": 99,
        "category": "Fried Food & Quick Bites",
        "image": "assets/images/chilli-garlic-potato-shots.webp"
    },
    {
        "name": "Peri Peri Fries",
        "price": 119,
        "category": "Fried Food & Quick Bites",
        "image": "assets/images/peri-peri-fries.webp"
    },
    {
        "name": "Cheese Chilli Toast (8 Pcs)",
        "price": 129,
        "category": "Fried Food & Quick Bites",
        "image": "assets/images/cheese-chilli-toast.webp"
    },
    {
        "name": "Cheese Loaded Fries",
        "price": 189,
        "category": "Fried Food & Quick Bites",
        "image": "assets/images/cheese-loaded-fries.webp"
    },
    {
        "name": "Veg Nuggets (16 Pcs)",
        "price": 189,
        "category": "Fried Food & Quick Bites",
        "image": "assets/images/veg-nuggets.webp"
    },
    {
        "name": "Fried Chicken Cheese Nachos",
        "price": 159,
        "category": "Fried Food & Quick Bites",
        "image": "assets/images/fried-chicken-cheese-nachos.webp"
    },
    {
        "name": "Chicken Cheese Chilli Toast",
        "price": 149,
        "category": "Fried Food & Quick Bites",
        "image": "assets/images/chicken-cheese-chilli-toast.webp"
    },
    {
        "name": "Chicken Cheese Loaded Fries",
        "price": 239,
        "category": "Fried Food & Quick Bites",
        "image": "assets/images/chicken-cheese-loaded-fries.webp"
    },
    {
        "name": "Chicken Nuggets (8 Pcs)",
        "price": 149,
        "category": "Fried Chicken & Fish",
        "image": "assets/images/chicken-nuggets.webp"
    },
    {
        "name": "Chicken Wings (4 Pcs)",
        "price": 159,
        "category": "Fried Chicken & Fish",
        "image": "assets/images/chicken-wings.webp"
    },
    {
        "name": "Chicken Popcorn (12 Pcs)",
        "price": 169,
        "category": "Fried Chicken & Fish",
        "image": "assets/images/chicken-popcorn.webp"
    },
    {
        "name": "Chicken Strips (4 Pcs)",
        "price": 179,
        "category": "Fried Chicken & Fish",
        "image": "assets/images/chicken-strips.webp"
    },
    {
        "name": "Fish Fingers (6 Pcs)",
        "price": 189,
        "category": "Fried Chicken & Fish",
        "image": "assets/images/fish-fingers.webp"
    },
    {
        "name": "Chicken Popcorn (20 Pcs)",
        "price": 250,
        "category": "Fried Chicken & Fish",
        "image": "assets/images/chicken-popcorn.webp"
    },
    {
        "name": "Chicken Wings (8 Pcs)",
        "price": 289,
        "category": "Fried Chicken & Fish",
        "image": "assets/images/chicken-wings.webp"
    },
    {
        "name": "Chicken Strips (8 Pcs)",
        "price": 319,
        "category": "Fried Chicken & Fish",
        "image": "assets/images/chicken-strips.webp"
    },
    {
        "name": "Veg Roll",
        "price": 89,
        "category": "Rolls",
        "image": "assets/images/veg-roll.webp"
    },
    {
        "name": "Paneer Roll",
        "price": 119,
        "category": "Rolls",
        "image": "assets/images/paneer-roll.webp"
    },
    {
        "name": "Single Egg Roll",
        "price": 99,
        "category": "Rolls",
        "image": "assets/images/single-egg-roll.webp"
    },
    {
        "name": "Single Egg Cheese Roll",
        "price": 119,
        "category": "Rolls",
        "image": "assets/images/single-egg-cheese-roll.webp"
    },
    {
        "name": "Chicken Roll",
        "price": 119,
        "category": "Rolls",
        "image": "assets/images/chicken-roll.webp"
    },
    {
        "name": "Double Egg Roll",
        "price": 109,
        "category": "Rolls",
        "image": "assets/images/double-egg-roll.webp"
    },
    {
        "name": "Chicken Cheese Roll",
        "price": 149,
        "category": "Rolls",
        "image": "assets/images/chicken-cheese-roll.webp"
    },
    {
        "name": "Double Egg Cheese Roll",
        "price": 139,
        "category": "Rolls",
        "image": "assets/images/double-egg-cheese-roll.webp"
    },
    {
        "name": "Double Egg Chicken Roll",
        "price": 169,
        "category": "Rolls",
        "image": "assets/images/double-egg-chicken-roll.webp"
    },
    {
        "name": "Egg Chicken Cheese Roll",
        "price": 199,
        "category": "Rolls",
        "image": "assets/images/egg-chicken-cheese-roll.webp"
    },
    {
        "name": "Extra Egg (Add-on)",
        "price": 10,
        "category": "Rolls",
        "image": "assets/images/extra-egg.webp"
    },
    {
        "name": "Penne White Sauce Veg Pasta",
        "price": 149,
        "category": "Pasta",
        "image": "assets/images/penne-white-sauce-veg-pasta.webp"
    },
    {
        "name": " Veg cheese Pasta",
        "price": 169,
        "category": "Pasta",
        "image": "assets/images/veg-cheese-pasta.webp"
    },
    {
        "name": "Chicken Pasta",
        "price": 179,
        "category": "Pasta",
        "image": "assets/images/chicken-pasta.webp"
    },
    {
        "name": "Chicken Cheese Pasta",
        "price": 199,
        "category": "Pasta",
        "image": "assets/images/chicken-cheese-pasta.webp"
    },
    {
        "name": "Veg Pizza (6 Inch)",
        "price": 169,
        "category": "Pizzas",
        "image": "assets/images/veg-pizza.webp"
    },
    {
        "name": "Veg Pizza",
        "price": 199,
        "category": "Pizzas",
        "image": "assets/images/veg-pizza.webp"
    },
    {
        "name": "Margherita Pizza",
        "price": 199,
        "category": "Pizzas",
        "image": "assets/images/margherita-pizza.webp"
    },
    {
        "name": "Corn Cheese Pizza",
        "price": 219,
        "category": "Pizzas",
        "image": "assets/images/corn-cheese-pizza.webp"
    },
    {
        "name": "Garden Exotic Pizza",
        "price": 219,
        "category": "Pizzas",
        "image": "assets/images/garden-exotic-pizza.webp"
    },
    {
        "name": "Paneer Pizza",
        "price": 239,
        "category": "Pizzas",
        "image": "assets/images/paneer-pizza.webp"
    },
    {
        "name": "Spicy Mexican Veg Pizza",
        "price": 259,
        "category": "Pizzas",
        "image": "assets/images/spicy-mexican-veg-pizza.webp"
    },
    {
        "name": "Non-Veg Pizza",
        "price": 229,
        "category": "Pizzas",
        "image": "assets/images/non-veg-pizza.webp"
    },
    {
        "name": "Roasted Chicken Pizza",
        "price": 269,
        "category": "Pizzas",
        "image": "assets/images/roasted-chicken-pizza.webp"
    },
    {
        "name": "Crispy Chicken Pizza",
        "price": 279,
        "category": "Pizzas",
        "image": "assets/images/crispy-chicken-pizza.webp"
    },
    {
        "name": "Spicy Pizza",
        "price": 299,
        "category": "Pizzas",
        "image": "assets/images/spicy-pizza.webp"
    },
    {
        "name": "Spicy Mexican Chicken Pizza",
        "price": 349,
        "category": "Pizzas",
        "image": "assets/images/spicy-mexican-chicken-pizza.webp"
    },
    {
        "name": "Affogato",
        "price": 99,
        "category": "Desserts & Ice Creams",
        "image": "assets/images/affogato.webp"
    },
    {
        "name": "Chocolate Brownie",
        "price": 119,
        "category": "Desserts & Ice Creams",
        "image": "assets/images/chocolate-brownie.webp"
    },
    {
        "name": "Chocolate Sizzling Brownie",
        "price": 169,
        "category": "Desserts & Ice Creams",
        "image": "assets/images/chocolate-sizzling-brownie.webp"
    },
    {
        "name": "Vanilla Ice Cream",
        "price": 59,
        "category": "Desserts & Ice Creams",
        "image": "assets/images/vanilla-ice-cream.webp"
    },
    {
        "name": "Strawberry Ice Cream",
        "price": 69,
        "category": "Desserts & Ice Creams",
        "image": "assets/images/strawberry-ice-cream.webp"
    },
    {
        "name": "Butterscotch Ice Cream",
        "price": 79,
        "category": "Desserts & Ice Creams",
        "image": "assets/images/butterscotch-ice-cream.webp"
    },
    {
        "name": "Chocolate Ice Cream",
        "price": 79,
        "category": "Desserts & Ice Creams",
        "image": "assets/images/chocolate-ice-cream.webp"
    },
    {
        "name": "Pista Ice Cream",
        "price": 89,
        "category": "Desserts & Ice Creams",
        "image": "assets/images/pista-ice-cream.webp"
    },
    {
        "name": "Black Currant Ice Cream",
        "price": 99,
        "category": "Desserts & Ice Creams",
        "image": "assets/images/black-currant-ice-cream.webp"
    },
    {
        "name": "Dry Fruits Ice Cream",
        "price": 119,
        "category": "Desserts & Ice Creams",
        "image": "assets/images/dry-fruits-ice-cream.webp"
    },
    {
        "name": "Coconut Pudding",
        "price": 159,
        "category": "Desserts & Ice Creams",
        "description": "Silky smooth coconut pudding · chilled & fresh",
        "image": "assets/images/coconut-pudding.webp"
    },
    {
        "name": "Oreo Cheese Cake Jar",
        "price": 169,
        "category": "Desserts & Ice Creams",
        "image": "assets/images/oreo-cheese-cake-jar.webp"
    },
    {
        "name": "Chocolate Cheese Cake Jar",
        "price": 189,
        "category": "Desserts & Ice Creams",
        "image": "assets/images/chocolate-cheese-cake-jar.webp"
    },
    {
        "name": "Biscoff Cheese Cake Jar",
        "price": 199,
        "category": "Desserts & Ice Creams",
        "image": "assets/images/biscoff-cheese-cake-jar.webp"
    },
    {
        "name": "Chicken Fry Piece Biryani",
        "price": 200,
        "category": "Biryanis",
        "description": "Parcel ₹150 | Table ₹200",
        "image": "assets/images/chicken-fry-piece-biryani.webp"
    },
    {
        "name": "Chicken Dum Biryani",
        "price": 250,
        "category": "Biryanis",
        "description": "Parcel ₹180 | Table ₹250",
        "image": "assets/images/chicken-dum-biryani.webp"
    },
    {
        "name": "Banana Leaf Biryani",
        "price": 329,
        "category": "Biryanis",
        "image": "assets/images/banana-leaf-biryani.webp"
    },
    {
        "name": "Chicken Moghalai Biryani",
        "price": 270,
        "category": "Biryanis",
        "image": "assets/images/chicken-moghalai-biryani.webp"
    },
    {
        "name": "Chicken Lollipop Biryani",
        "price": 260,
        "category": "Biryanis",
        "image": "assets/images/chicken-lollipop-biryani.webp"
    },
    {
        "name": "Boneless Chicken Biryani",
        "price": 240,
        "category": "Biryanis",
        "image": "assets/images/boneless-chicken-biryani.webp"
    },
    {
        "name": "Mutton Fry Piece Biryani",
        "price": 379,
        "category": "Biryanis",
        "description": "Tender mutton fry pieces · fragrant dum biryani",
        "image": "assets/images/mutton-fry-piece-biryani.webp"
    },
    {
        "name": "Mutton Biryani",
        "price": 0,
        "category": "Biryanis",
        "image": "assets/images/mutton-biryani.webp"
    },
    {
        "name": "Mushroom Biryani",
        "price": 200,
        "category": "Veg Biryanis",
        "description": "Fresh mushrooms · aromatic basmati · pure veg",
        "image": "assets/images/mushroom-biryani.webp"
    },
    {
        "name": "Paneer Biryani",
        "price": 229,
        "category": "Veg Biryanis",
        "description": "Soft paneer cubes · fragrant spiced rice · pure veg",
        "image": "assets/images/paneer-biryani.webp"
    },
    {
        "name": "Chicken Lollipops (6 Pcs) (Dry/Wet)",
        "price": 289,
        "category": "Chinese",
        "image": "assets/images/chicken-lollipops.webp"
    },
    {
        "name": "Chicken Roast",
        "price": 230,
        "category": "Chinese",
        "image": "assets/images/chicken-roast.webp"
    },
    {
        "name": "Schezwan Chicken",
        "price": 239,
        "category": "Chinese",
        "image": "assets/images/schezwan-chicken.webp"
    },
    {
        "name": "Chicken Noodles",
        "price": 0,
        "category": "Chinese",
        "image": "assets/images/chicken-noodles.webp"
    },
    {
        "name": "Veg Noodles",
        "price": 0,
        "category": "Chinese",
        "image": "assets/images/veg-noodles.webp"
    },
    {
        "name": "Chicken 65",
        "price": 219,
        "category": "Starters",
        "image": "assets/images/chicken-65.webp"
    },
    {
        "name": "Chicken Manchurian",
        "price": 219,
        "category": "Starters",
        "image": "assets/images/chicken-manchurian.webp"
    },
    {
        "name": "Chilli Chicken",
        "price": 219,
        "category": "Starters",
        "image": "assets/images/chilli-chicken.webp"
    },
    {
        "name": "Chicken Lollipop (6 Pcs)",
        "price": 289,
        "category": "Starters",
        "image": "assets/images/chicken-lollipop.webp"
    },
    {
        "name": "Dragon Chicken",
        "price": 249,
        "category": "Starters",
        "image": "assets/images/dragon-chicken.webp"
    },
    {
        "name": "Chicken Majestic",
        "price": 239,
        "category": "Starters",
        "image": "assets/images/chicken-majestic.webp"
    },
    {
        "name": "Chicken 555",
        "price": 239,
        "category": "Starters",
        "image": "assets/images/chicken-555.webp"
    },
    {
        "name": "Garlic Chicken",
        "price": 219,
        "category": "Starters",
        "image": "assets/images/garlic-chicken.webp"
    },
    {
        "name": "8 to 8 Chicken",
        "price": 239,
        "category": "Starters",
        "image": "assets/images/8-to-8-chicken.webp"
    },
    {
        "name": "Pepper Chicken",
        "price": 229,
        "category": "Starters",
        "image": "assets/images/pepper-chicken.webp"
    },
    {
        "name": "Sezwan Chicken",
        "price": 239,
        "category": "Starters",
        "image": "assets/images/sezwan-chicken.webp"
    },
    {
        "name": "Highway Delite Spl (Chicken)",
        "price": 269,
        "category": "Starters",
        "image": "assets/images/highway-delite-spl.webp"
    },
    {
        "name": "Mutton 65",
        "price": 319,
        "category": "Starters",
        "image": "assets/images/mutton-65.webp"
    },
    {
        "name": "Mutton Manchurian",
        "price": 319,
        "category": "Starters",
        "image": "assets/images/mutton-manchurian.webp"
    },
    {
        "name": "Chilli Mutton",
        "price": 329,
        "category": "Starters",
        "image": "assets/images/chilli-mutton.webp"
    },
    {
        "name": "Mutton Roast",
        "price": 359,
        "category": "Starters",
        "image": "assets/images/mutton-roast.webp"
    },
    {
        "name": "Pepper Mutton",
        "price": 349,
        "category": "Starters",
        "image": "assets/images/pepper-mutton.webp"
    },
    {
        "name": "Sezwan Mutton",
        "price": 359,
        "category": "Starters",
        "image": "assets/images/sezwan-mutton.webp"
    },
    {
        "name": "Gobi Manchurian",
        "price": 190,
        "category": "Veg Starters",
        "image": "assets/images/gobi-manchurian.webp"
    },
    {
        "name": "Gobi Chilli",
        "price": 190,
        "category": "Veg Starters",
        "image": "assets/images/gobi-chilli.webp"
    },
    {
        "name": "Gobi 65",
        "price": 190,
        "category": "Veg Starters",
        "image": "assets/images/gobi-65.webp"
    },
    {
        "name": "Veg Manchurian",
        "price": 199,
        "category": "Veg Starters",
        "image": "assets/images/veg-manchurian.webp"
    },
    {
        "name": "Veg 65",
        "price": 199,
        "category": "Veg Starters",
        "image": "assets/images/veg-65.webp"
    },
    {
        "name": "Veg Chilli",
        "price": 189,
        "category": "Veg Starters",
        "image": "assets/images/veg-chilli.webp"
    },
    {
        "name": "Veg Sezwan",
        "price": 189,
        "category": "Veg Starters",
        "image": "assets/images/veg-sezwan.webp"
    },
    {
        "name": "Chilli Mushroom",
        "price": 189,
        "category": "Veg Starters",
        "image": "assets/images/chilli-mushroom.webp"
    },
    {
        "name": "Mushroom 65",
        "price": 189,
        "category": "Veg Starters",
        "image": "assets/images/mushroom-65.webp"
    },
    {
        "name": "Mushroom Manchurian",
        "price": 189,
        "category": "Veg Starters",
        "image": "assets/images/mushroom-manchurian.webp"
    },
    {
        "name": "Pepper Mushroom",
        "price": 199,
        "category": "Veg Starters",
        "image": "assets/images/pepper-mushroom.webp"
    },
    {
        "name": "Sezwan Mushroom",
        "price": 229,
        "category": "Veg Starters",
        "image": "assets/images/sezwan-mushroom.webp"
    },
    {
        "name": "Babycorn Majestic",
        "price": 199,
        "category": "Veg Starters",
        "image": "assets/images/babycorn-majestic.webp"
    },
    {
        "name": "Babycorn 555",
        "price": 199,
        "category": "Veg Starters",
        "image": "assets/images/babycorn-555.webp"
    },
    {
        "name": "Babycorn Garlic",
        "price": 219,
        "category": "Veg Starters",
        "image": "assets/images/babycorn-garlic.webp"
    },
    {
        "name": "Paneer 65",
        "price": 189,
        "category": "Veg Starters",
        "image": "assets/images/paneer-65.webp"
    },
    {
        "name": "Chilli Paneer",
        "price": 189,
        "category": "Veg Starters",
        "image": "assets/images/chilli-paneer.webp"
    },
    {
        "name": "Paneer Manchurian",
        "price": 189,
        "category": "Veg Starters",
        "image": "assets/images/paneer-manchurian.webp"
    },
    {
        "name": "Paneer Roast",
        "price": 199,
        "category": "Veg Starters",
        "image": "assets/images/paneer-roast.webp"
    },
    {
        "name": "Paneer Majestic",
        "price": 199,
        "category": "Veg Starters",
        "image": "assets/images/paneer-majestic.webp"
    },
    {
        "name": "Highway Delite (Veg)",
        "price": 229,
        "category": "Veg Starters",
        "image": "assets/images/highway-delite.webp"
    },
    {
        "name": "Veg Manchow Soup",
        "price": 99,
        "category": "Soups",
        "image": "assets/images/veg-manchow-soup.webp"
    },
    {
        "name": "Chicken Manchow Soup",
        "price": 129,
        "category": "Soups",
        "image": "assets/images/chicken-manchow-soup.webp"
    },
    {
        "name": "Hot N Sour Soup",
        "price": 119,
        "category": "Soups",
        "image": "assets/images/hot-n-sour-soup.webp"
    },
    {
        "name": "Chicken Hot N Sour Soup",
        "price": 119,
        "category": "Soups",
        "image": "assets/images/chicken-hot-n-sour-soup.webp"
    },
    {
        "name": "Sweet Corn Soup",
        "price": 129,
        "category": "Soups",
        "image": "assets/images/sweet-corn-soup.webp"
    },
    {
        "name": "Mixed Biryani",
        "price": 299,
        "category": "Biryanis",
        "image": "assets/images/mixed-biryani.webp"
    },
    {
        "name": "Mixed Mughlai Biryani",
        "price": 329,
        "category": "Biryanis",
        "image": "assets/images/mixed-mughlai-biryani.webp"
    },
    {
        "name": "Pot Biryani",
        "price": 350,
        "category": "Biryanis",
        "image": "assets/images/pot-biryani.webp"
    },
    {
        "name": "Kheema Biryani",
        "price": 369,
        "category": "Biryanis",
        "image": "assets/images/kheema-biryani.webp"
    },
    {
        "name": "Highway Delite Spl Biryani",
        "price": 399,
        "category": "Biryanis",
        "image": "assets/images/highway-delite-spl-biryani.webp"
    },
    {
        "name": "Baby Corn Biryani",
        "price": 219,
        "category": "Veg Biryanis",
        "image": "assets/images/baby-corn-biryani.webp"
    },
    {
        "name": "Veg Mixed Biryani",
        "price": 249,
        "category": "Veg Biryanis",
        "image": "assets/images/veg-mixed-biryani.webp"
    },
    {
        "name": "Chicken Fried Rice",
        "price": 179,
        "category": "Fried Rice",
        "image": "assets/images/chicken-fried-rice.webp"
    },
    {
        "name": "Spl Chicken Fried Rice",
        "price": 199,
        "category": "Fried Rice",
        "image": "assets/images/spl-chicken-fried-rice.webp"
    },
    {
        "name": "Egg Fried Rice",
        "price": 159,
        "category": "Fried Rice",
        "image": "assets/images/egg-fried-rice.webp"
    },
    {
        "name": "Double Egg Fried Rice",
        "price": 169,
        "category": "Fried Rice",
        "image": "assets/images/double-egg-fried-rice.webp"
    },
    {
        "name": "Chicken Sezwan Fried Rice",
        "price": 199,
        "category": "Fried Rice",
        "image": "assets/images/chicken-sezwan-fried-rice.webp"
    },
    {
        "name": "Mutton Fried Rice",
        "price": 289,
        "category": "Fried Rice",
        "image": "assets/images/mutton-fried-rice.webp"
    },
    {
        "name": "Spl Mutton Fried Rice",
        "price": 319,
        "category": "Fried Rice",
        "image": "assets/images/spl-mutton-fried-rice.webp"
    },
    {
        "name": "Spl Highway Delite Fried Rice",
        "price": 259,
        "category": "Fried Rice",
        "image": "assets/images/spl-highway-delite-fried-rice.webp"
    },
    {
        "name": "Veg Fried Rice",
        "price": 139,
        "category": "Veg Fried Rice",
        "image": "assets/images/veg-fried-rice.webp"
    },
    {
        "name": "Spl Veg Fried Rice",
        "price": 169,
        "category": "Veg Fried Rice",
        "image": "assets/images/spl-veg-fried-rice.webp"
    },
    {
        "name": "Babycorn Fried Rice",
        "price": 159,
        "category": "Veg Fried Rice",
        "image": "assets/images/babycorn-fried-rice.webp"
    },
    {
        "name": "Spl Babycorn Fried Rice",
        "price": 189,
        "category": "Veg Fried Rice",
        "image": "assets/images/spl-babycorn-fried-rice.webp"
    },
    {
        "name": "Mushroom Fried Rice",
        "price": 189,
        "category": "Veg Fried Rice",
        "image": "assets/images/mushroom-fried-rice.webp"
    },
    {
        "name": "Veg Mix Fried Rice",
        "price": 169,
        "category": "Veg Fried Rice",
        "image": "assets/images/veg-mix-fried-rice.webp"
    },
    {
        "name": "Veg Manchurian Fried Rice",
        "price": 169,
        "category": "Veg Fried Rice",
        "image": "assets/images/veg-manchurian-fried-rice.webp"
    },
    {
        "name": "Curd Rice",
        "price": 89,
        "category": "Rice",
        "description": "Served with pickle",
        "image": "assets/images/curd-rice.webp"
    },
    {
        "name": "Sambar Rice",
        "price": 119,
        "category": "Rice",
        "description": "Served with papad",
        "image": "assets/images/sambar-rice.webp"
    },
    {
        "name": "Sambar Rice with Omlette",
        "price": 189,
        "category": "Rice",
        "image": "assets/images/sambar-rice-with-omlette.webp"
    },
    {
        "name": "Sambar Rice with Chicken Fry",
        "price": 219,
        "category": "Rice",
        "image": "assets/images/sambar-rice-with-chicken-fry.webp"
    }
]
};
