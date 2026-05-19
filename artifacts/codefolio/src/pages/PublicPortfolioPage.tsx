import { useEffect } from "react";
import { useParams } from "wouter";
import { useGetPublicPortfolio } from "@workspace/api-client-react";
import { templateMap } from "@/templates/templateMap";

export default function PublicPortfolioPage() {
  const { username } = useParams<{ username: string }>();
  const { data: portfolio, isLoading, error } = useGetPublicPortfolio(username || "", {
    query: {
      enabled: !!username,
      queryKey: [`/api/public/${username}`]
    }
  });

  useEffect(() => {
    if (portfolio) {
      document.title = portfolio.profile?.name
        ? `${portfolio.profile.name} | CodeFolio`
        : `${portfolio.username} | CodeFolio`;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", portfolio.profile?.bio || `Portfolio of ${portfolio.username}`);
      }
    }
  }, [portfolio]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-400">Portfolio not found for {username}</p>
      </div>
    );
  }

  const TemplateComponent = templateMap[portfolio.templateId] || templateMap.minimalist;

  return <TemplateComponent data={portfolio} />;
}
