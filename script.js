 // Initialize Locomotive Scroll
        const scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            smartphone: {
                smooth: true
            },
            tablet: {
                smooth: true
            }
        });

        // Update Locomotive Scroll when images are loaded
        window.addEventListener('load', () => {
            scroll.update();
        });

        // Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });

        // Active link highlighting
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('nav ul li a');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 300) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Back to top button
        const backToTopBtn = document.querySelector('.back-to-top');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // GSAP Animations
        gsap.registerPlugin(ScrollTrigger, TextPlugin);
        
        // Hero text animation
        gsap.from(".hero h1", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from(".hero p", {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: "power3.out"
        });

        gsap.from(".hero-btns", {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.6,
            ease: "power3.out"
        });

        // Stats counter animation
document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const suffix = stat.getAttribute('data-suffix') || '';
        let count = 0;
        const duration = 2000; // Animation duration in ms
        const startTime = null;
        
        const animateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            count = Math.floor(progress * target);
            stat.textContent = count + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(animateCount);
            }
        };
        
        ScrollTrigger.create({
            trigger: stat,
            start: "top 80%",
            onEnter: () => {
                requestAnimationFrame(animateCount);
            },
            once: true
        });
    });
});

        // Service card animations
        gsap.utils.toArray('.service-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: "power3.out"
            });
        });

        // Team member animations
        gsap.utils.toArray('.team-member').forEach((member, i) => {
            gsap.from(member, {
                scrollTrigger: {
                    trigger: member,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: "power3.out"
            });
        });

        // Portfolio filter functionality
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Testimonial slider
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        const testimonialDots = document.querySelectorAll('.testimonial-dot');
        let currentSlide = 0;

        function showSlide(index) {
            testimonialSlides.forEach(slide => slide.classList.remove('active'));
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            
            testimonialSlides[index].classList.add('active');
            testimonialDots[index].classList.add('active');
            currentSlide = index;
        }

        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });

        // Auto slide change
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }, 5000);

        // Three.js Scene
        const canvasContainer = document.getElementById('canvas-container');
        
        if (canvasContainer) {
            const scene = new THREE.Scene();
            scene.background = null;
            const camera = new THREE.PerspectiveCamera(75, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            
            renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
            canvasContainer.appendChild(renderer.domElement);
            
            // Add lights
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
            
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);
            
            // Create a complex geometry (you can replace this with a GLTF model)
            const geometry = new THREE.IcosahedronGeometry(1.5, 1);
            const material = new THREE.MeshPhongMaterial({ 
                color: 0x2a5ee8,
                emissive: 0x072534,
                specular: 0xffffff,
                shininess: 50,
                flatShading: true
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
            
            // Position camera
            camera.position.z = 4;
            
            // Add orbit controls
            const controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableZoom = false;
            controls.enablePan = false;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 1;
            
            // Handle window resize
            window.addEventListener('resize', () => {
                camera.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
            });
            
            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            }
            
            animate();
        }
        
        // Mapbox Initialization
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
        
        const map = new mapboxgl.Map({
            container: 'map-container',
            style: 'mapbox://styles/mapbox/light-v10',
            center: [-74.006, 40.7128], // New York coordinates
            zoom: 12
        });
        
        // Add marker
        new mapboxgl.Marker()
            .setLngLat([-74.006, 40.7128])
            .addTo(map);
            
        // Form submission
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                
                // Here you would typically send the form data to a server
                console.log({ name, email, subject, message });
                
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                
                // Reset form
                contactForm.reset();
            });
        }
        
        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('.newsletter-input').value;
                
                // Here you would typically send the email to your newsletter service
                console.log('Newsletter subscription:', email);
                
                // Show success message
                alert('Thank you for subscribing to our newsletter!');
                
                // Reset form
                newsletterForm.reset();
            });
        }
        
        // Intersection Observer for fade-in animations
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(el => {
            fadeObserver.observe(el);
        });