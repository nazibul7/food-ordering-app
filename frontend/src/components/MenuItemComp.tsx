import { MenuItem } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type TMenuItem={
    menuItem:MenuItem
}

export default function MenuItemComp({menuItem}:TMenuItem) {
  return (
    <Card className="cursor-pointer">
        <CardHeader>
            <CardTitle>{menuItem.name}</CardTitle>
        </CardHeader>
        <CardContent className="font-bold">${menuItem.price}</CardContent>
    </Card>
  )
}
