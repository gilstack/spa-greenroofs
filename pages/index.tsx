import { NavigateToResource } from "@refinedev/nextjs-router";

export default function Home() {
  return <NavigateToResource resource="markers" />;
}

Home.noLayout = true;
