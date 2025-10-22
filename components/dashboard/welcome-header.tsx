'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from '@/lib/mock-data';
import { Calendar, Clock } from 'lucide-react';

interface WelcomeHeaderProps {
  user: User;
}

export function WelcomeHeader({ user }: WelcomeHeaderProps) {
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="bg-gradient-to-r from-[#2E58A6] to-[#032B61] text-white border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-white/80 text-lg">
              Ready to continue your learning journey?
            </p>
            <Badge 
              variant="secondary" 
              className="bg-white/20 text-white hover:bg-white/30 w-fit"
            >
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Badge>
          </div>
          <div className="flex flex-col space-y-2 text-white/80">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{getCurrentDate()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{getCurrentTime()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}