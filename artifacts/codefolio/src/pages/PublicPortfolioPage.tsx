import { useEffect } from "react";
import { useParams } from "wouter";
import { useGetPublicPortfolio } from "@workspace/api-client-react";
import { templateMap } from "@/templates/templateMap";
import { Loader2 } from "lucide-react";

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
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500 mb-4" />
        <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">Loading Profile</p>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-white p-6 text-center">
        <h1 className="text-6xl font-bold tracking-tighter mb-4 text-white/20">404</h1>
        <p className="text-xl text-gray-400 mb-8">Portfolio stream disconnected.</p>
        <p className="text-sm text-gray-600">The user "{username}" does not exist or has unpublished their portfolio.</p>
      </div>
    );
  }

  const TemplateComponent = templateMap[portfolio.templateId] || templateMap['minimal-universal'] || templateMap.minimalist;

  return <TemplateComponent data={portfolio} />;
}
