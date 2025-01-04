"use client";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Card, CardContent, CardFooter } from "@workspace/ui/components/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { Link } from "lucide-react";
import { CampaignData } from "@/types/campaign";

interface FormField {
  id: keyof CampaignData;
  label: string;
  placeholder: string;
  help?: string;
}

const mainFields: FormField[] = [
  {
    id: 'subject',
    label: 'Subject Line',
    placeholder: 'Enter campaign subject...',
    help: 'This will be the first text your recipients see in their inbox.'
  },
  {
    id: 'title',
    label: 'Email Title',
    placeholder: 'Enter email title...',
    help: 'This will appear at the top of your email. Defaults to subject line if left empty.'
  }
];

const ctaFields: FormField[] = [
  {
    id: 'ctaText',
    label: 'Button Text',
    placeholder: 'e.g., Learn More, Get Started...'
  },
  {
    id: 'ctaUrl',
    label: 'Button URL',
    placeholder: 'https://...'
  }
];

interface FormProps {
  campaign: CampaignData;
  onUpdate: (field: keyof CampaignData, value: string) => void;
}

export function CampaignForm({ campaign, onUpdate }: FormProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-6 max-w-2xl">
          {mainFields.map(field => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input
                id={field.id}
                value={campaign[field.id]}
                onChange={(e) => onUpdate(field.id, e.target.value)}
                placeholder={field.placeholder}
              />
              {field.help && (
                <p className="text-sm text-muted-foreground">{field.help}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Link className="h-4 w-4 mr-2" />
              Call to Action
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Call to Action</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Add a button to your email that links to your website or landing page.
                </p>
                <div className="space-y-2">
                  {ctaFields.map(field => (
                    <div key={field.id} className="space-y-2">
                      <Label htmlFor={field.id}>{field.label}</Label>
                      <Input
                        id={field.id}
                        value={campaign[field.id] || ""}
                        onChange={(e) => onUpdate(field.id, e.target.value)}
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
} 