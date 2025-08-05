import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Share2, Download, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import portraitImage from '@/assets/portfolio-portrait.jpg';
import architectureImage from '@/assets/portfolio-architecture.jpg';
import streetImage from '@/assets/portfolio-street.jpg';

const PhotoDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // Mock photo data - in real app, fetch by id
  const photoData = {
    1: {
      id: 1,
      title: 'Urban Solitude',
      category: 'Portrait',
      image: portraitImage,
      date: '2024-01-15',
      location: 'Downtown District',
      description: 'A contemplative portrait capturing the essence of urban isolation and human resilience in the modern cityscape.',
      camera: 'Canon EOS R5',
      lens: '85mm f/1.4',
      settings: 'f/2.8, 1/200s, ISO 400',
    },
    2: {
      id: 2,
      title: 'Geometric Harmony',
      category: 'Architecture',
      image: architectureImage,
      date: '2024-01-12',
      location: 'Modern Quarter',
      description: 'Exploring the intersection of light and shadow in contemporary architectural design.',
      camera: 'Canon EOS R5',
      lens: '24-70mm f/2.8',
      settings: 'f/8, 1/125s, ISO 100',
    },
    3: {
      id: 3,
      title: 'City Rhythms',
      category: 'Street',
      image: streetImage,
      date: '2024-01-10',
      location: 'Market Street',
      description: 'Capturing the vibrant energy and spontaneous moments of urban street life.',
      camera: 'Canon EOS R5',
      lens: '35mm f/1.4',
      settings: 'f/4, 1/250s, ISO 800',
    },
  };

  const photo = id && photoData[parseInt(id)] ? photoData[parseInt(id) as keyof typeof photoData] : null;

  if (!photo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Photo not found</h1>
          <Link to="/gallery" className="text-primary hover:underline">
            Return to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: photo.title,
          text: photo.description,
          url: url,
        });
      } catch (error) {
        // Fallback to copying URL
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link copied!",
          description: "Photo URL has been copied to your clipboard.",
        });
      }
    } else {
      // Fallback to copying URL
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Photo URL has been copied to your clipboard.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-28 pb-8">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/gallery"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Gallery
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Heart size={16} className="mr-2" />
                Like
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Display */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Image */}
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-lg bg-muted">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary">{photo.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(photo.date).toLocaleDateString()}
                  </span>
                </div>
                
                <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
                  {photo.title}
                </h1>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {photo.description}
                </p>
                
                <div className="text-sm text-muted-foreground">
                  <p className="mb-1">
                    <span className="font-medium">Location:</span> {photo.location}
                  </p>
                </div>
              </div>

              {/* Technical Details */}
              <div className="border-t border-border pt-6">
                <h3 className="font-semibold text-foreground mb-4">Technical Details</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium">Camera:</span> {photo.camera}
                  </p>
                  <p>
                    <span className="font-medium">Lens:</span> {photo.lens}
                  </p>
                  <p>
                    <span className="font-medium">Settings:</span> {photo.settings}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-border pt-6">
                <div className="space-y-3">
                  <Button className="w-full" onClick={handleShare}>
                    <Share2 size={16} className="mr-2" />
                    Share Photo
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download size={16} className="mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PhotoDetail;