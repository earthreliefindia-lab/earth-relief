import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars, PerspectiveCamera } from "@react-three/drei";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Clock, Globe, Twitter, Facebook, Youtube, Upload, Send, CheckCircle2 } from "lucide-react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// --- 3D Components ---

function EcoSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      // React to mouse movement
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        state.mouse.y * 0.2,
        0.1
      );
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        -state.mouse.x * 0.2,
        0.1
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
        <MeshDistortMaterial
          color="eco-green"
          speed={3}
          distort={0.3}
          radius={1}
          emissive="#166534"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function ParticleField() {
  const count = 100;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  const pointsRef = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#22c55e"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// --- UI Components ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(34, 197, 94, 0.2)" }}
    className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const AnimatedInput = ({ label, type = "text", ...props }: any) => (
  <div className="space-y-2 group">
    <Label className="text-white/60 group-focus-within:text-eco-green transition-colors">
      {label}
    </Label>
    <Input
      type={type}
      className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-eco-green focus-visible:border-eco-green h-12 transition-all"
      {...props}
    />
  </div>
);

// --- Main Page Component ---

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message planted successfully!");
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white selection:bg-eco-green/30 font-body">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] p-6 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-eco-green/20 flex items-center justify-center border border-eco-green/30 group-hover:border-eco-green/60 transition-all">
            <img
              src="/assets/generated/logo-mark-transparent.dim_200x200.png"
              alt="Logo"
              className="w-6 h-6 object-cover"
            />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight">Earth Relief</span>
        </a>
        <a 
          href="#" 
          className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all text-sm font-medium"
        >
          Back to Home
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background 3D */}
        <div className="absolute inset-0 z-0">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#22c55e" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
            <Suspense fallback={null}>
              <EcoSphere />
              <ParticleField />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-heading text-6xl md:text-8xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
              Contact <span className="text-eco-green">Earth Relief</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Let's build a greener future together. Reach out to our global innovation hub.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-4"
            >
              <Button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-eco-green hover:bg-eco-green/90 text-black font-bold px-8 py-6 rounded-full text-lg shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all"
              >
                Get Started
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Info & Form Section */}
      <section id="contact-form" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Contact Details (Left Column) */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-heading font-bold mb-8">Global Reach</h2>
              
              <GlassCard className="flex items-start gap-6 group">
                <div className="p-4 rounded-2xl bg-eco-green/10 text-eco-green group-hover:bg-eco-green group-hover:text-black transition-all duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Our HQ</h3>
                  <p className="text-white/60 leading-relaxed">
                    Vill-Bishnulli, Post-Dujana, Dadri,<br />
                    G.B. Nagar (203207), Uttar Pradesh, India
                  </p>
                </div>
              </GlassCard>

              <GlassCard className="flex items-start gap-6 group">
                <div className="p-4 rounded-2xl bg-eco-green/10 text-eco-green group-hover:bg-eco-green group-hover:text-black transition-all duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Direct Line</h3>
                  <p className="text-white/60">+91 7838889588</p>
                </div>
              </GlassCard>

              <GlassCard className="flex items-start gap-6 group">
                <div className="p-4 rounded-2xl bg-eco-green/10 text-eco-green group-hover:bg-eco-green group-hover:text-black transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Inquiries</h3>
                  <p className="text-white/60">earthrelief.india@gmail.com</p>
                  <p className="text-white/60">eco@earthrelief.in</p>
                </div>
              </GlassCard>

              <GlassCard className="flex items-start gap-6 group">
                <div className="p-4 rounded-2xl bg-eco-green/10 text-eco-green group-hover:bg-eco-green group-hover:text-black transition-all duration-300">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Innovation Hours</h3>
                  <p className="text-white/60">Monday – Saturday</p>
                  <p className="text-white/60">10:00 AM – 6:00 PM</p>
                </div>
              </GlassCard>
            </motion.div>

            {/* Social Section */}
            <div className="pt-8">
              <h3 className="text-xl font-bold mb-6 text-white/40 uppercase tracking-widest">Connect with us</h3>
              <div className="flex gap-4">
                {[
                  { icon: Globe, href: "http://www.earthrelief.in/" },
                  { icon: Twitter, href: "https://x.com/earth_relief" },
                  { icon: Facebook, href: "https://www.facebook.com/earthrelief.india" },
                  { icon: Youtube, href: "https://www.youtube.com/@Earth_relief" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="p-4 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-eco-green hover:border-eco-green/30 transition-all"
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form (Right Column) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <GlassCard className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-eco-green/10 blur-[100px] -mr-32 -mt-32" />
                    
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnimatedInput 
                          label="Full Name" 
                          placeholder="John Doe" 
                          required
                          value={formState.name}
                          onChange={(e: any) => setFormState({...formState, name: e.target.value})}
                        />
                        <AnimatedInput 
                          label="Email Address" 
                          type="email" 
                          placeholder="john@example.com" 
                          required
                          value={formState.email}
                          onChange={(e: any) => setFormState({...formState, email: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnimatedInput 
                          label="Phone Number" 
                          placeholder="+91 XXXXX XXXXX"
                          value={formState.phone}
                          onChange={(e: any) => setFormState({...formState, phone: e.target.value})}
                        />
                        <AnimatedInput 
                          label="Subject" 
                          placeholder="Inquiry about..." 
                          required
                          value={formState.subject}
                          onChange={(e: any) => setFormState({...formState, subject: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white/60">Your Message</Label>
                        <Textarea 
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-eco-green focus-visible:border-eco-green min-h-[150px]"
                          placeholder="Tell us how we can collaborate..."
                          required
                          value={formState.message}
                          onChange={(e) => setFormState({...formState, message: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white/60">Attachments</Label>
                        <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-eco-green/30 hover:bg-white/5 transition-all cursor-pointer group">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-white/20 group-hover:text-eco-green transition-colors" />
                          <p className="text-sm text-white/40">Drop files here or click to upload</p>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-eco-green to-[#3b82f6] hover:opacity-90 text-white font-bold py-8 rounded-2xl text-xl flex gap-3 shadow-[0_0_30px_rgba(34,197,94,0.3)] group"
                      >
                        {isSubmitting ? (
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                        ) : (
                          <>
                            Send Message
                            <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </form>
                  </GlassCard>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <GlassCard className="max-w-xl mx-auto py-16 px-12">
                    <CheckCircle2 className="w-24 h-24 text-eco-green mx-auto mb-8 animate-bounce" />
                    <h2 className="text-3xl font-heading font-bold mb-4">Transmission Successful!</h2>
                    <p className="text-xl text-white/60 mb-8 leading-relaxed">
                      Your message has been planted like a seed. Together we are growing a greener future.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsSubmitted(false)}
                      className="border-white/10 hover:bg-white/5 rounded-full px-8 py-6"
                    >
                      Send another message
                    </Button>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer Glow */}
      <div className="h-32 bg-gradient-to-t from-eco-green/10 to-transparent" />
    </div>
  );
}
