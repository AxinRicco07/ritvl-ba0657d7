
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  MapPin, 
  CheckCircle, 
  Circle,
  Phone,
  User
} from "lucide-react";

interface TrackingStage {
  id: string;
  name: string;
  location: string;
  completed: boolean;
  current: boolean;
  timestamp?: string;
}

interface DeliveryPartner {
  partnerName: string;
  riderName: string;
  riderPhone: string;
  vehicleNumber: string;
}

const trackingStages: TrackingStage[] = [
  {
    id: "pickup",
    name: "Yet to pickup",
    location: "RITVL Warehouse, Mumbai",
    completed: true,
    current: false,
    timestamp: "Jan 15, 2024 - 10:30 AM"
  },
  {
    id: "picked",
    name: "Order Picked",
    location: "RITVL Warehouse, Mumbai",
    completed: true,
    current: false,
    timestamp: "Jan 15, 2024 - 2:15 PM"
  },
  {
    id: "transit",
    name: "In transit",
    location: "Delhi Sorting Hub",
    completed: true,
    current: true,
    timestamp: "Jan 16, 2024 - 8:00 AM"
  },
  {
    id: "out-delivery",
    name: "Out for delivery",
    location: "Local Delivery Hub, Delhi",
    completed: false,
    current: false
  },
  {
    id: "delivered",
    name: "Delivered",
    location: "Your Address",
    completed: false,
    current: false
  }
];

const deliveryPartner: DeliveryPartner = {
  partnerName: "FastTrack Logistics",
  riderName: "Rajesh Kumar",
  riderPhone: "+91 9876543210",
  vehicleNumber: "DL 1234 AB"
};

export default function TrackingOrder() {
  const { orderId } = useParams();
  const [stages, setStages] = useState<TrackingStage[]>(trackingStages);

  useEffect(() => {
    // In a real app, you would fetch tracking data based on orderId
    console.log("Tracking order:", orderId);
  }, [orderId]);

  const getCurrentStageIndex = () => {
    return stages.findIndex(stage => stage.current);
  };

  const getStageIcon = (stage: TrackingStage, index: number) => {
    if (stage.completed) {
      return <CheckCircle className="h-6 w-6 text-green-600" />;
    } else if (stage.current) {
      return <Circle className="h-6 w-6 text-blue-600 fill-current" />;
    } else {
      return <Circle className="h-6 w-6 text-gray-300" />;
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 md:px-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/orders">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-serif">Track Your Order</h1>
          <p className="text-muted-foreground">Order #{orderId}</p>
        </div>
      </div>

      {/* Tracking Stepper */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200">
              <div 
                className="h-full bg-green-600 transition-all duration-500"
                style={{ 
                  width: `${(stages.filter(s => s.completed).length / (stages.length - 1)) * 100}%` 
                }}
              />
            </div>
            
            {/* Stepper */}
            <div className="flex justify-between relative z-10">
              {stages.map((stage, index) => (
                <div key={stage.id} className="flex flex-col items-center">
                  <div className="bg-background border-2 border-gray-200 rounded-full p-1 mb-3">
                    {getStageIcon(stage, index)}
                  </div>
                  <div className="text-center max-w-24">
                    <p className={`text-sm font-medium ${
                      stage.completed || stage.current 
                        ? 'text-foreground' 
                        : 'text-muted-foreground'
                    }`}>
                      {stage.name}
                    </p>
                    {stage.current && (
                      <Badge variant="default" className="mt-1 text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tracking Activity */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tracking Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stages
              .filter(stage => stage.completed || stage.current)
              .reverse()
              .map((stage, index) => (
                <div key={stage.id} className="flex items-start gap-4 pb-4 last:pb-0">
                  <div className="mt-1">
                    {stage.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-blue-600 fill-current" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{stage.name}</h4>
                      {stage.current && (
                        <Badge variant="outline" size="sm">
                          In Progress
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <MapPin className="h-4 w-4" />
                      <span>{stage.location}</span>
                    </div>
                    {stage.timestamp && (
                      <p className="text-sm text-muted-foreground">
                        {stage.timestamp}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Delivery Partner Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Delivery Partner Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Partner Information</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Partner:</strong> {deliveryPartner.partnerName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Rider:</strong> {deliveryPartner.riderName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Vehicle:</strong> {deliveryPartner.vehicleNumber}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {deliveryPartner.riderPhone}
                  </span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Delivery Partner
                </Button>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Estimated Delivery:</strong> Today, 6:00 PM - 8:00 PM
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
              Please ensure someone is available to receive the package
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
