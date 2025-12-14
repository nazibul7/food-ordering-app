import { MenuItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export type TMenuItem = {
  menuItem: MenuItem;
  addToCart: (menu: MenuItem) => void;
};

export default function MenuItemComp({ menuItem, addToCart }: TMenuItem) {
  return (
    <Card className="cursor-pointer" onClick={() => addToCart(menuItem)}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">${menuItem.price}</CardContent>
    </Card>
  );
}
