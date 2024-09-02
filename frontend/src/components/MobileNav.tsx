import { CircleUserRound, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { Separator } from "@radix-ui/react-separator"
import { useAuth0 } from "@auth0/auth0-react"
import MobileNavLinks from "./MobileNavLinks"

const MobileNav = () => {
    const { isAuthenticated, loginWithRedirect, user, logout } = useAuth0()
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-orange-500" />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        {isAuthenticated ? (
                            <span className="flex items-center gap-2 font-bold">
                                <CircleUserRound className="text-orange-500" />
                                {user?.email}
                            </span>
                        ) :
                            (<span>Welcome to MernEats.com!</span>)
                        }
                    </SheetTitle>
                    <Separator />
                    <SheetDescription className="flex flex-col gap-4">
                        {isAuthenticated ? (
                            <MobileNavLinks />
                        ) : (
                            <Button onClick={() => loginWithRedirect()} className="flex-1 font-bold bg-orange-500">Login</Button>
                        )}
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav
