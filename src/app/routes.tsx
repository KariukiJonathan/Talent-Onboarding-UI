import { createBrowserRouter } from "react-router";
import RecruiterLayout from "./components/layouts/RecruiterLayout";
import TalentLayout from "./components/layouts/TalentLayout";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import CompaniesPage from "./pages/recruiter/CompaniesPage";
import RolesPage from "./pages/recruiter/RolesPage";
import TalentPage from "./pages/recruiter/TalentPage";
import RoadmapBuilderPage from "./pages/recruiter/RoadmapBuilderPage";
import RecruiterProgressPage from "./pages/recruiter/RecruiterProgressPage";
import TalentDashboard from "./pages/talent/TalentDashboard";
import RoadmapExperiencePage from "./pages/talent/RoadmapExperiencePage";
import RoadmapStepPage from "./pages/talent/RoadmapStepPage";
import WorkplaceSimulatorPage from "./pages/talent/WorkplaceSimulatorPage";
import TalentProgressPage from "./pages/talent/TalentProgressPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/recruiter",
    Component: RecruiterLayout,
    children: [
      { index: true, Component: RecruiterDashboard },
      { path: "companies", Component: CompaniesPage },
      { path: "roles", Component: RolesPage },
      { path: "talent", Component: TalentPage },
      { path: "roadmap-builder", Component: RoadmapBuilderPage },
      { path: "roadmap-builder/:roleId", Component: RoadmapBuilderPage },
      { path: "progress", Component: RecruiterProgressPage },
    ],
  },
  {
    path: "/talent",
    Component: TalentLayout,
    children: [
      { index: true, Component: TalentDashboard },
      { path: "roadmap", Component: RoadmapExperiencePage },
      { path: "roadmap/step/:stepId", Component: RoadmapStepPage },
      { path: "simulator", Component: WorkplaceSimulatorPage },
      { path: "progress", Component: TalentProgressPage },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);