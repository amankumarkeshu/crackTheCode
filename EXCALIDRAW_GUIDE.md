# 🎨 Excalidraw Integration Guide

Your CrackTheCode platform already has **excellent Excalidraw integration** built-in! Here's how to use it effectively in your system design posts.

## 🚀 **How to Use Excalidraw in Your MDX Posts**

### **Method 1: Static Image (Recommended)**

For better SEO and faster loading, export your Excalidraw diagrams as images:

```mdx
<Excalidraw 
  src="/diagrams/system-design/load-balancer.svg" 
  caption="Load balancer architecture with health checks"
  size="lg"
/>
```

### **Method 2: Interactive Embed**

For live, interactive diagrams that readers can pan and zoom:

```mdx
<Excalidraw 
  url="https://excalidraw.com/#json=6234829384,A2F4D8E9A8B1C3D5E2F7G9H0I1J4K7L9"
  caption="Interactive system design - click to explore"
  height={600}
/>
```

## 📁 **Directory Structure**

```
public/
└── diagrams/
    ├── system-design/
    │   ├── load-balancer.svg
    │   ├── microservices.svg
    │   ├── database-sharding.svg
    │   └── caching-layers.svg
    ├── lld/
    │   ├── parking-lot.svg
    │   ├── elevator-system.svg
    │   └── chat-application.svg
    └── dsa/
        ├── tree-traversal.svg
        ├── graph-algorithms.svg
        └── dynamic-programming.svg
```

## 🎯 **Component Options**

### **Available Props:**

```typescript
// Static Image Mode
<Excalidraw 
  src="/diagrams/system-design/example.svg"  // Required
  caption="Diagram description"               // Optional
  alt="Alt text for accessibility"           // Optional
  size="sm|md|lg|full"                      // Optional (default: lg)
  className="custom-css-classes"             // Optional
/>

// Interactive Mode
<Excalidraw 
  url="https://excalidraw.com/#json=..."     // Required
  caption="Interactive diagram"              // Optional
  alt="Alt text"                            // Optional
  height={480}                              // Optional (default: 480px)
  size="sm|md|lg|full"                      // Optional
  className="custom-css-classes"             // Optional
/>
```

### **Size Options:**
- `sm`: max-width: 28rem (448px)
- `md`: max-width: 42rem (672px) 
- `lg`: max-width: 56rem (896px) - **default**
- `full`: max-width: 100%

## 🎨 **Creating Diagrams - Step by Step**

### **Step 1: Create in Excalidraw**

1. Go to [excalidraw.com](https://excalidraw.com)
2. Create your system design diagram
3. Use consistent colors and styling:
   - **Servers/Services**: Light blue rectangles
   - **Databases**: Cylinder shapes in green
   - **Caches**: Orange rectangles  
   - **Load Balancers**: Purple diamonds
   - **Users/Clients**: Gray circles

### **Step 2: Export Options**

#### **Option A: Static Export (Recommended)**
1. Click **Export image** in Excalidraw
2. Choose **SVG** format for crisp scaling
3. Save as `/public/diagrams/system-design/your-diagram.svg`
4. Use in MDX: `<Excalidraw src="/diagrams/system-design/your-diagram.svg" />`

#### **Option B: Interactive Share**
1. Click **Share** in Excalidraw  
2. Copy the shareable link (contains encrypted JSON)
3. Use in MDX: `<Excalidraw url="https://excalidraw.com/#json=..." />`

## 💡 **Best Practices for System Design Diagrams**

### **1. Consistent Visual Language**
```mdx
<!-- Good: Consistent styling and clear labels -->
<Excalidraw 
  src="/diagrams/system-design/netflix-architecture.svg"
  caption="Netflix microservices architecture showing video streaming pipeline"
  size="full"
/>
```

### **2. Progressive Complexity**
```mdx
## Basic Architecture
<Excalidraw src="/diagrams/basic-setup.svg" caption="Simple client-server setup" />

## With Load Balancing  
<Excalidraw src="/diagrams/with-loadbalancer.svg" caption="Adding load balancer for scale" />

## Full Production System
<Excalidraw src="/diagrams/production-ready.svg" caption="Complete production architecture" />
```

### **3. Interactive Exploration**
```mdx
<!-- Use interactive for complex diagrams readers should explore -->
<Excalidraw 
  url="https://excalidraw.com/#json=complex_microservices_diagram"
  caption="🔍 Interactive diagram - pan and zoom to explore each service"
  height={700}
/>
```

## 🎯 **Example Usage in System Design Posts**

### **Complete Example:**

```mdx
---
title: "Design Netflix Video Streaming"
category: "system-design"
difficulty: "senior"
---

# Design Netflix Video Streaming System

## High-Level Architecture

<Excalidraw 
  src="/diagrams/system-design/netflix-overview.svg"
  caption="Netflix high-level architecture serving 200M+ users globally"
  size="full"
/>

The Netflix architecture consists of three main components:

1. **Content Delivery Network (CDN)**
2. **Microservices Backend** 
3. **Recommendation Engine**

## Detailed Service Architecture

<Excalidraw 
  url="https://excalidraw.com/#json=6234829384,A2F4D8E9A8B1C3D5E2F7G9H0I1J4K7L9"
  caption="🔍 Interactive view - explore each microservice in detail"
  height={600}
/>

### CDN Strategy

<Excalidraw 
  src="/diagrams/system-design/netflix-cdn.svg"
  caption="Netflix CDN distribution with edge caching strategy"
  size="lg"
/>

## Database Design

<Excalidraw 
  src="/diagrams/system-design/netflix-database.svg"
  caption="Database sharding strategy for user data and content metadata"
/>
```

## 🔧 **Technical Implementation Details**

### **Component Features:**
- ✅ **SSR Safe**: Properly handles server-side rendering
- ✅ **Responsive**: Adapts to different screen sizes
- ✅ **Accessible**: Proper alt text and ARIA labels
- ✅ **SEO Friendly**: Static images are indexed by search engines
- ✅ **Performance**: Lazy loading and optimized images
- ✅ **Interactive**: Live Excalidraw embeds support pan/zoom

### **Browser Support:**
- ✅ All modern browsers
- ✅ Mobile devices (touch pan/zoom)
- ✅ Dark/light theme compatible

## 📊 **Performance Tips**

### **1. Use SVG for Static Diagrams**
- Vector graphics scale perfectly
- Small file sizes
- SEO friendly
- Fast loading

### **2. Optimize Interactive Embeds**
- Use for complex diagrams only
- Set appropriate height
- Consider loading performance
- Test on mobile devices

### **3. Naming Conventions**
```
diagrams/
├── system-design/
│   ├── company-service-component.svg
│   └── netflix-video-streaming.svg
├── lld/
│   ├── design-pattern-observer.svg
│   └── parking-lot-class-diagram.svg
```

## 🎨 **Diagram Templates**

### **System Design Template Checklist:**
- [ ] **Load Balancers** (purple diamonds)
- [ ] **Application Servers** (blue rectangles) 
- [ ] **Databases** (green cylinders)
- [ ] **Caches** (orange rectangles)
- [ ] **Message Queues** (yellow rectangles)
- [ ] **CDN** (gray clouds)
- [ ] **Users** (gray circles)
- [ ] **Data Flow Arrows** (clear directional flow)
- [ ] **Labels** (service names and technologies)

### **Color Scheme:**
- **#3B82F6** - Application services (blue)
- **#10B981** - Databases (green)  
- **#F59E0B** - Caches (orange)
- **#8B5CF6** - Load balancers (purple)
- **#EF4444** - Failure points (red)
- **#6B7280** - Users/external (gray)

## 🚀 **Quick Start Examples**

### **Load Balancer Diagram:**
```mdx
<Excalidraw 
  src="/diagrams/system-design/load-balancer-types.svg"
  caption="Layer 4 vs Layer 7 load balancing comparison"
  size="lg"
/>
```

### **Database Sharding:**
```mdx
<Excalidraw 
  src="/diagrams/system-design/database-sharding.svg"
  caption="Horizontal vs vertical database partitioning strategies"
/>
```

### **Microservices:**
```mdx
<Excalidraw 
  url="https://excalidraw.com/#json=microservices_interactive"
  caption="🔍 Explore the microservices communication patterns"
  height={500}
/>
```

---

Your Excalidraw integration is **production-ready** and perfect for creating engaging system design content! The combination of static exports for SEO and interactive embeds for exploration gives you the best of both worlds.

## 🎯 **Next Steps:**

1. **Create your first diagram** at excalidraw.com
2. **Export as SVG** and save to `/public/diagrams/system-design/`
3. **Add to your next blog post** using the `<Excalidraw>` component
4. **Test on mobile** to ensure good user experience

Happy diagramming! 🎨✨