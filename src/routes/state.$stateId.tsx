import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { z } from "zod";
import {
  StateHeritagePage,
  getStateData,
} from "@/components/virasat/StateHeritagePage";

// Access-gating only: preserve the existing state route and full-screen page design.
export const Route = createFileRoute("/state/$stateId")({
  validateSearch: z.object({
    preview: z.union([z.string(), z.boolean()]).optional(),
  }),
  head: ({ params }) => {
    const data = getStateData(params.stateId);
    const title = `${data.name} Heritage — Virasat Regional Archive`;
    const description = `${data.tagline}. Explore ${data.name}'s history, monuments, culture, festivals and timeline in the Virasat digital archive.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: StateRoute,
});

function StateRoute() {
  const { stateId } = useParams({ from: "/state/$stateId" });
  const { preview } = Route.useSearch();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("virasat_user"));

  return (
    <StateHeritagePage
      stateId={stateId}
      isAccessGated={(preview === "true" || preview === true) && !isLoggedIn}
      onBackToMap={() => navigate({ to: "/", hash: "map" })}
      onSelectState={id =>
        navigate({ to: "/state/$stateId", params: { stateId: id } })
      }
      onLogin={() =>
        navigate({ to: "/auth", search: { returnState: stateId } })
      }
    />
  );
}
