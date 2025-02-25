import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  SignInButton,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [showSignIn, setshowSignIn] = useState(false);
  const {user}=useUser();
  const [search, setsearch] = useSearchParams();

  useEffect(() => {
    if (search.get("sign-in")) {
      console.log(search.toString());

      setshowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target == e.currentTarget) {
      setshowSignIn(false);
      setsearch({});
    }
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" className="h-20" alt="Logo" />
        </Link>

        <div className="flex gap-9">
          <SignedOut>
            <Button variant="outline" onClick={() => setshowSignIn(true)}>
              Login
            </Button>
            <SignInButton />
          </SignedOut>

          <SignedIn>
          
           {user?.unsafeMetadata?.role=="recruiter" &&(

         
            <Link to="/post-jobs">
              <Button variant="destructive" className="rounded-full">
                <PenBox size={20} className="mr-2"></PenBox>
                Post a job
              </Button>
            </Link>
              )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  labelIcon={<BriefcaseBusiness size={15} />}
                  label="My Jobs"
                  href="/my-jobs"
                />
                <UserButton.Link
                  labelIcon={<Heart size={15} />}
                  label="Saved Jobs"
                  href="/saved-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {showSignIn && (
        <div
          className="fixed inset-0  flex items-center z-10 justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
