import { styled } from "@mui/material";

import { AnimationFigure } from "@/lib/xfi.lib/components/atoms";

import { GreetingWidget } from "@/components/organisms";
import { AuthLayout, Page } from "@/components/templates";

const Home = () => {
  return (
    <Page title="SUMMARY.JOIN">
      <AuthLayout>
        <GreetingWidget />
        <StyledAnimationFigure />
      </AuthLayout>
    </Page>
  );
};

const StyledAnimationFigure = styled(AnimationFigure, {
  name: "StyledAnimationFigure",
})(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: "50%",
  transform: "translate(-50%, 25%)",

  [theme.breakpoints.down("md")]: {
    width: "12.88069rem",
    height: "12.9535rem",
    transform: "translate(-50%, 40%)",
  },
}));

export default Home;
