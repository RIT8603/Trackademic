import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { schedule } from "@/lib/data";
import { Clock } from "lucide-react";

export function TodaysSchedule() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {schedule.map((item, index) => (
            <div key={index}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-24 text-sm text-muted-foreground pt-1">{item.time}</div>
                <div className="flex-1">
                  <p className="font-semibold">{item.subject}</p>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>{item.location}</span>
                  </div>
                </div>
                <Badge 
                  variant={item.status === 'Ongoing' ? 'destructive' : 'secondary'}
                  className={item.status === 'Ongoing' ? 'animate-pulse' : ''}
                >
                  {item.status}
                </Badge>
              </div>
              {index < schedule.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
