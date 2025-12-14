import { Resturant } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type TResturantInfo = {
  resturant: Resturant;
};

export default function ResturantInfo({ resturant }: TResturantInfo) {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {resturant.resturantName}
        </CardTitle>
        <CardDescription>
          {resturant.city}, {resturant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {resturant.cusines.map((cusine, index) => (
          <span key={index} className="flex">
            <span>{cusine}</span>
            {index < resturant.cusines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
}
