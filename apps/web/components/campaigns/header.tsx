"use client";

import { Button } from "@workspace/ui/components/button";
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Eye, Pencil, Split, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog";

interface ViewMode {
  icon: any;
  label: string;
  value: "write" | "preview" | "split";
}

const viewModes: ViewMode[] = [
  { icon: Pencil, label: "Write", value: "write" },
  { icon: Eye, label: "Preview", value: "preview" },
  { icon: Split, label: "Split View", value: "split" },
];

interface HeaderProps {
  lastSavedText: string;
  view: "write" | "preview" | "split";
  setView: (view: "write" | "preview" | "split") => void;
  onClear: () => void;
  isMobile: boolean;
}

const ViewModeTab = ({ icon: Icon, label, mobile }: { icon: any; label: string; mobile?: boolean }) => (
  mobile ? <Icon className="h-4 w-4" /> : <><Icon className="h-4 w-4 mr-2" />{label}</>
);

export function CampaignHeader({ lastSavedText, view, setView, onClear, isMobile }: HeaderProps) {
  return (
    <div className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-[1400px] py-4 mx-auto">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Create New Campaign</h1>
            <p className="text-sm text-muted-foreground">{lastSavedText}</p>
          </div>
          <div className="flex items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear draft?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your draft campaign. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onClear}>Clear</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Tabs value={view} onValueChange={(v) => setView(v as typeof view)}>
              <TabsList>
                {viewModes.map(mode => (
                  <TabsTrigger
                    key={mode.value}
                    value={mode.value}
                    disabled={mode.value === "split" && isMobile}
                  >
                    <ViewModeTab
                      icon={mode.icon}
                      label={mode.label}
                      mobile={isMobile}
                    />
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
} 