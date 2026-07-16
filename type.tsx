export type CourseType = "starter" | "main" | "dessert" ;

export type GoldenMenuItem = {
    itemName: string;
    description: string;
    course: string | CourseType;
    price: number;
    intensity?: string;    
};

export type RootStackParamList = {
    WelcomeScreen: undefined;
    HomeScreen: undefined;
    AddMenuItemScreen: {
        items: GoldenMenuItem[];
        setItems: React.Dispatch<React.SetStateAction<GoldenMenuItem[]>>;
    };
    FilterScreen: {items: GoldenMenuItem[]} | undefined;
};