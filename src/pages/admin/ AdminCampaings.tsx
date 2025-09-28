import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { fetchPrefix } from "@/utils/fetch";

interface Campaign {
  id: string;
  name: string;
  isActive: boolean;
  banners: {
    imageUrl: string;
    redirectUrl: string;
    imageOrder: number;
  }[];
}

const fetchCampaigns = async () => {
  const res = await fetch(`${fetchPrefix}/api/campaigns`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch campaigns");
  }
  return res.json();
};

const deleteCampaign = async (campaignId: string) => {
  const res = await fetch(`${fetchPrefix}/api/campaigns/${campaignId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to delete campaign");
  }
  return res.json();
};

export default function CampaignsPage() {
  const queryClient = useQueryClient();

  const {
    data: campaigns = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["campaigns"],
    queryFn: fetchCampaigns,
  });

  const { mutate: handleCampaignDelete } = useMutation({
    mutationFn: deleteCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
    onError: (error: unknown) => {
      alert((error as Error).message || "Failed to delete campaign");
    },
  });

  // Find active campaign
  const activeCampaign = campaigns.find((campaign) => campaign.isActive);

  // Get inactive campaigns for history
  const inactiveCampaigns = campaigns.filter((campaign) => !campaign.isActive);

  if (isLoading) {
    return <div className="space-y-6 p-6">Loading...</div>;
  }

  if (isError) {
    return <div className="space-y-6 p-6">Error loading campaigns</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold">Campaigns</h1>
        <p className="text-muted-foreground">
          Create discount banners and run campaigns
        </p>
      </div>

      {/* Active campaign */}
      <Card>
        <CardHeader>
          <CardTitle>Active Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          {activeCampaign ? (
            <div className="flex items-center justify-between">
              <span>{activeCampaign.name}</span>
              <Button
                onClick={() => handleCampaignDelete(activeCampaign.id)}
                variant="ghost"
                size="sm"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          ) : (
            <p>No active campaigns at the moment.</p>
          )}
        </CardContent>
      </Card>

      {/* History section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">History of Campaigns</h2>
          <Button asChild>
            <Link to="/admin/campaigns/add">Add new</Link>
          </Button>
        </div>

        {/* Scrollable container for history items */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {inactiveCampaigns.length > 0 ? (
            inactiveCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <span>{campaign.name}</span>
                  <Button
                    onClick={() => handleCampaignDelete(campaign.id)}
                    variant="ghost"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-4">No campaigns found</CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
