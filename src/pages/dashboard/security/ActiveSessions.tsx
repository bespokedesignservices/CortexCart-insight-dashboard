
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Shield, Laptop, Smartphone, Globe, Clock, Navigation } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SessionData {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

const ActiveSessions: React.FC = () => {
  const { toast } = useToast();
  const [sessions, setSessions] = React.useState<SessionData[]>([
    {
      id: "sess_1",
      device: "MacBook Pro",
      browser: "Chrome 112",
      location: "San Francisco, US",
      ip: "192.168.1.1",
      lastActive: "Active now",
      isCurrent: true,
    },
    {
      id: "sess_2",
      device: "iPhone 13",
      browser: "Safari Mobile 15",
      location: "San Francisco, US",
      ip: "192.168.1.2",
      lastActive: "2 hours ago",
      isCurrent: false,
    },
    {
      id: "sess_3",
      device: "Windows PC",
      browser: "Firefox 98",
      location: "Boston, US",
      ip: "103.45.67.89",
      lastActive: "3 days ago",
      isCurrent: false,
    },
    {
      id: "sess_4",
      device: "iPad",
      browser: "Safari 15",
      location: "London, UK",
      ip: "84.23.107.65",
      lastActive: "1 week ago",
      isCurrent: false,
    },
  ]);

  const getDeviceIcon = (device: string) => {
    if (device.includes("iPhone") || device.includes("iPad") || device.includes("Android")) {
      return <Smartphone className="h-4 w-4" />;
    } else {
      return <Laptop className="h-4 w-4" />;
    }
  };

  const handleRevokeSession = (sessionId: string) => {
    setSessions(sessions.filter((session) => session.id !== sessionId));
    toast({
      title: "Session revoked",
      description: "The selected session has been successfully revoked.",
    });
  };

  const handleRevokeAllOtherSessions = () => {
    setSessions(sessions.filter((session) => session.isCurrent));
    toast({
      title: "All other sessions revoked",
      description: "All sessions except for your current one have been revoked.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Manage Active Sessions</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-recoai-purple" />
            Active Sessions
          </CardTitle>
          <CardDescription>
            Review and manage all your active sessions. If you don't recognize a session, you should revoke it immediately.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {sessions.length} active {sessions.length === 1 ? "session" : "sessions"}
              </p>
              <Button 
                variant="outline" 
                onClick={handleRevokeAllOtherSessions}
                disabled={sessions.length <= 1}
              >
                Revoke All Other Sessions
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getDeviceIcon(session.device)}
                        <div>
                          <p className="font-medium">{session.device}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Globe className="h-3 w-3" /> 
                            {session.browser}
                            {session.isCurrent && (
                              <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                                Current
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Navigation className="h-3 w-3" /> {session.location}
                      </div>
                    </TableCell>
                    <TableCell>{session.ip}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {session.lastActive}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevokeSession(session.id)}
                        disabled={session.isCurrent}
                      >
                        {session.isCurrent ? "Current Session" : "Revoke"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActiveSessions;
