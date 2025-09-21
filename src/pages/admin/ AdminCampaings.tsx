import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function CampaignsPage() {
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
          <p>No active campaigns at the moment.</p>
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

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">Campaign 1</CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">Campaign 2</CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">Campaign 3</CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">Campaign 4</CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
