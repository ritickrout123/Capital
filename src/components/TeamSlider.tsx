import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Linkedin, Twitter, Mail, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  expertise: string[];
  linkedin?: string;
  twitter?: string;
  email?: string;
}

interface TeamSliderProps {
  teamMembers: TeamMember[];
}

export function TeamSlider({ teamMembers }: TeamSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, teamMembers.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentMember = teamMembers[currentIndex];

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Main Slider */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
          {/* Image Section */}
          <div className="relative order-2 md:order-1">
            <div className="aspect-square rounded-xl overflow-hidden shadow-2xl bg-white/10">
              {currentMember.image ? (
                <img
                  src={currentMember.image}
                  alt={currentMember.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallbackIcon = parent.querySelector('.fallback-icon') as HTMLElement;
                      if (fallbackIcon) {
                        fallbackIcon.style.display = 'flex';
                      }
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center fallback-icon">
                  <Users className="w-16 h-16 text-white/50" />
                </div>
              )}
            </div>
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="sm"
              className="absolute left-4 top-4 bg-white/20 border-white/30 text-white hover:bg-white/30"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="absolute right-4 top-4 bg-white/20 border-white/30 text-white hover:bg-white/30"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center order-1 md:order-2">
            <div className="mb-4">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-2">
                {currentMember.name}
              </h2>
              <p className="text-xl text-white/90 font-medium">
                {currentMember.role}
              </p>
            </div>

            <p className="text-lg text-white/80 mb-6 leading-relaxed">
              {currentMember.bio}
            </p>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">
                Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentMember.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/20 rounded-full text-sm text-white/90"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {currentMember.linkedin && (
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                  asChild
                >
                  <a href={currentMember.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {currentMember.twitter && (
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                  asChild
                >
                  <a href={currentMember.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {currentMember.email && (
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                  asChild
                >
                  <a href={`mailto:${currentMember.email}`}>
                    <Mail className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 gap-2">
        {teamMembers.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Thumbnail Navigation */}
      <div className="hidden md:flex justify-center mt-6 gap-4 overflow-x-auto">
        {teamMembers.map((member, index) => (
          <button
            key={member.id}
            className={`flex-shrink-0 transition-all duration-300 ${
              index === currentIndex
                ? "opacity-100 scale-105"
                : "opacity-60 hover:opacity-80"
            }`}
            onClick={() => goToSlide(index)}
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-white/30 bg-white/10">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallbackIcon = parent.querySelector('.thumbnail-fallback') as HTMLElement;
                        if (fallbackIcon) {
                          fallbackIcon.style.display = 'flex';
                        }
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center thumbnail-fallback">
                  <Users className="w-8 h-8 text-white/50" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
