import { useEffect, useRef } from "react";
import { motion, useAnimation } from "motion/react";
import { BadgeCheck, ExternalLink } from "lucide-react";

interface Certificate {
	id: string;
	kind: "certificate";
	image: string;
	issuer: string;
	title: string;
	issued: string;
	url: string;
}

interface Badge {
	id: string;
	kind: "badge";
	image: string;
}

const CERTIFICATES: Certificate[] = [
	{
		id: "certificate-01",
		kind: "certificate",
		image: "/certifications/certificate-01.png",
		issuer: "freeCodeCamp",
		title: "Python Developer Certification",
		issued: "June 2026",
		url: "https://www.freecodecamp.org/certification/ahamedasri/python-v9",
	},
	{
		id: "certificate-02",
		kind: "certificate",
		image: "/certifications/certificate-02.png",
		issuer: "LinkedIn Learning",
		title: "Learning Git and GitHub",
		issued: "July 2026",
		url: "https://www.linkedin.com/learning/certificates/d077807610bb8275c9a6711b5983109e6933a465a9b3efdc85011c283ac2e7c0",
	},
];

const BADGE_IMAGES = [
	"/certifications/badge-01.png",
	"/certifications/badge-02.png",
	"/certifications/badge-03.png",
	"/certifications/badge-04.png",
	"/certifications/badge-05.png",
];

const BADGES: Badge[] = BADGE_IMAGES.map((image, index) => ({
	id: `badge-${String(index + 1).padStart(2, "0")}`,
	kind: "badge",
	image,
}));

function CertificateCard({ certificate }: { certificate: Certificate }) {
	return (
		<article className="grid gap-6 border border-foreground/15 bg-foreground/[0.03] p-5 lg:grid-cols-[180px_1fr] lg:p-6">
			<div className="flex items-center justify-center overflow-hidden border border-yellow-700/50 bg-black/30">
				<img src={certificate.image} alt={`${certificate.title} certificate`} className="block h-auto w-full object-contain" />
			</div>
			<div>
				<div>
					<h3 className="font-rajdhani text-2xl font-semibold uppercase tracking-wide text-foreground">{certificate.title}</h3>
					<p className="mt-2 font-mono-tech text-[10px] uppercase tracking-widest text-yellow-500">{certificate.issuer}</p>
				</div>
				<div className="mt-5 flex flex-col items-start gap-3">
					<span className="font-mono-tech text-[10px] uppercase tracking-wider text-foreground/45">ISSUED: {certificate.issued}</span>
					<a href={certificate.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono-tech text-xs text-yellow-300 hover:text-yellow-200">SHOW CREDENTIAL <ExternalLink size={13} /></a>
				</div>
			</div>
		</article>
	);
}

export function CertificationSection() {
	const controls = useAnimation();
	const railRef = useRef<HTMLDivElement>(null);
	const pointerStart = useRef<{ x: number; currentX: number } | null>(null);
	const movingBadges = [...BADGES, ...BADGES];

	useEffect(() => {
		controls.start({ x: ["0%", "-50%"], transition: { duration: 20, ease: "linear", repeat: Infinity } });
	}, [controls]);

	const resumeRail = () => controls.start({ x: "-50%", transition: { duration: 20, ease: "linear", repeat: Infinity } });
	const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
		controls.stop();
		pointerStart.current = {
			x: event.clientX,
			currentX: (railRef.current?.getBoundingClientRect().left ?? 0) - (event.currentTarget.getBoundingClientRect().left ?? 0),
		};
		event.currentTarget.setPointerCapture(event.pointerId);
	};
	const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
		if (!pointerStart.current || !railRef.current) return;
		const delta = event.clientX - pointerStart.current.x;
		controls.set({ x: pointerStart.current.currentX + delta });
	};
	const handlePointerUp = () => {
		pointerStart.current = null;
	};

	return (
		<section
			id="certifications"
			className="relative overflow-hidden border-y border-yellow-900/30 bg-background py-32"
		>
			<div className="absolute inset-0 hex-bg opacity-30" />
			<div className="relative mx-auto max-w-6xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="px-6 mb-14"
				>
					<div className="mb-3 flex items-center gap-3">
						<div className="h-px w-6 bg-yellow-600" />
						<span className="font-mono-tech text-xs uppercase tracking-widest text-yellow-500">
							// Verified Learning
						</span>
					</div>
					<div className="flex items-end gap-6">
						<h2 className="font-bebas text-[clamp(3rem,8vw,6rem)] leading-none text-foreground">CERTIFICATIONS</h2>
						<div className="mb-3 flex items-center gap-2">
							<BadgeCheck size={16} className="text-yellow-600" />
							<span className="font-mono-tech text-xs text-foreground/40">{CERTIFICATES.length} entries</span>
						</div>
					</div>
					<p className="mt-5 max-w-xl font-rajdhani text-lg text-foreground/55">
						Certificates with context, badges in motion, and a growing record of security practice.
					</p>
				</motion.div>

				<div className="grid gap-5 px-6 md:grid-cols-2">
					{CERTIFICATES.map((certificate) => <CertificateCard key={certificate.id} certificate={certificate} />)}
				</div>

				<div className="mt-16">
					<div className="mb-5 flex items-center justify-between px-6">
						<div className="flex items-center gap-3"><BadgeCheck className="text-yellow-400" size={20} /><h3 className="font-bebas text-3xl tracking-wide text-foreground">BADGES</h3><span className="font-mono-tech text-xs text-foreground/40">{BADGES.length} entries</span></div>
					</div>
					<div className="relative cursor-grab overflow-hidden border-y border-foreground/10 py-8 active:cursor-grabbing" onMouseEnter={() => controls.stop()} onMouseLeave={resumeRail} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}>
						<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
						<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
						<motion.div ref={railRef} animate={controls} className="flex w-max items-center gap-10 px-6">
							{movingBadges.map((badge, index) => <div key={`${badge.id}-${index}`} className="flex h-44 w-44 shrink-0 items-center justify-center border border-yellow-700/40 bg-foreground/[0.03] p-5"><img src={badge.image} alt="" className="h-full w-full object-contain" draggable="false" /></div>)}
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
