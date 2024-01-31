'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import SplitType from 'split-type';
import Lenis from '@studio-freight/lenis';
import './landing.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Landing() {
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(ScrollTrigger);

  const textRef = useRef<HTMLSpanElement | null>(null);
  const inspectionRef = useRef(null);
  const inspectionTextRef = useRef(null);
  const marqueeRef = useRef(null);
  const ringBgRef = useRef(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  function animateWords() {
    const words = ['Note', 'AI Chat', 'Schedule'];
    let currentIndex = 0;
    let split: SplitType;
    const textElement = textRef.current;

    function updateText() {
      if (textElement) {
        textElement.textContent = words[currentIndex];
        split = new SplitType(textElement, { types: 'chars' });
        animateChars(split.chars);
        currentIndex = (currentIndex + 1) % words.length;
      }
    }

    function animateChars(chars: HTMLElement[] | null) {
      gsap.from(chars, {
        delay: 0.5,
        yPercent: 100,
        stagger: 0.03,
        duration: 1.5,
        ease: 'power4.out',
        onComplete: () => {
          if (split) {
            split.revert();
          }
        }
      });
    }

    setInterval(updateText, 3000);
  }

  function inspectionSection() {
    const inspectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: inspectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    inspectionTl
      .to(inspectionTextRef.current, {
        y: -100
      })
      .to(
        ringBgRef.current,
        {
          y: -50,
          height: 300
        },
        '<'
      );

    gsap.to(marqueeRef.current, {
      scrollTrigger: {
        trigger: marqueeRef.current,
        start: 'top 80%',
        end: 'bottom top',
        scrub: true
      },
      x: 200
    });
  }

  function sliderSection() {
    // let mm = gsap.matchMedia();

    gsap.context(() => {
      const slider = sliderRef.current;
      const sliderSections = gsap.utils.toArray('.slide') as HTMLDivElement[];

      if (slider) {
        const sliderTl = gsap.timeline({
          defaults: {
            ease: 'none'
          },
          scrollTrigger: {
            trigger: slider,
            pin: true,
            pinnedContainer: slider,
            scrub: 1,
            end: () => '+=' + slider.offsetWidth
          }
        });

        sliderTl
          .to(
            slider,
            {
              xPercent: -290
            },
            '<'
          )
          .to(
            '.progress',
            {
              width: '100%'
            },
            '<'
          );

        sliderSections.forEach((stop, index) => {
          const slidePElem = stop.querySelector('.slide-p');

          if (slidePElem instanceof HTMLElement) {
            const slideText = new SplitType(slidePElem, {
              types: 'chars'
            });

            sliderTl.from(slideText.chars, {
              y: 10,
              stagger: 0.03,
              scrollTrigger: {
                trigger: slidePElem,
                start: 'top bottom',
                end: 'bottom center',
                containerAnimation: sliderTl,
                scrub: true
              }
            });
          }
        });
      }
    });
  }

  function contactSection() {
    gsap.set('h4, .inner-contact span', {
      yPercent: 100
    });
    gsap.set('.inner-contact p', {
      opacity: 0
    });
    gsap.set('.inner-contact a', {
      opacity: 0
    });

    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.inner-contact',
        start: '50% 100%',
        end: '10% 40%',
        scrub: true
      }
    });

    contactTl
      .to('.line-top, .line-bottom', {
        width: '100%'
      })
      .to('h4, .inner-contact span', {
        yPercent: 0
      })
      .to('.inner-contact p', {
        opacity: 1
      })
      .to('.inner-contact a', {
        opacity: 1
      });
  }

  function setupSmoothScroll() {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  useEffect(() => {
    animateWords();
    inspectionSection();
    sliderSection();
    contactSection();
    setupSmoothScroll();
  }, []);

  return (
    <div className="bg-black">
      <main className="hero">
        <div className="left layout-ws">
          <h1>
            <div className="mask primary-h1">
              <span ref={textRef}>Schedule</span>
            </div>
            <div className="mask">
              <span>Create Your Own</span>
            </div>
          </h1>
        </div>
        <div className="right">
          <div className="img-overlay"></div>
          <Image src="/main.jpg" alt="right" width={100} height={100} />
        </div>
      </main>

      <section className="details">
        <div className="inspection layout-ws" ref={inspectionRef}>
          <h2 ref={inspectionTextRef}>Sync</h2>
          <div className="ring-bg" ref={ringBgRef}>
            <p>Efficient Organization</p>
          </div>
          <p>
            My Note's comprehensive approach ensures every aspect of your notes and schedules are seamlessly synchronized, offering an
            efficient and streamlined user experience.
          </p>
        </div>
        <div className="mask marquee">
          <h3 ref={marqueeRef}>Convenience</h3>
        </div>
      </section>

      <div className="no-overflow">
        <section className="slider" ref={sliderRef}>
          <div className="slide">
            <div className="inner layout-ws">
              <p className="slide-p">
                My Note는 사용자의 일정 관리와 메모 작성을 더욱 쉽고 효율적으로 만들어줍니다. 간편하게 메모를 추가하고, 일정을 확인할 수
                있습니다.
              </p>
            </div>
          </div>
          <div className="slide">
            <div className="inner layout-ws">
              <p className="slide-p">
                AI 챗 기능을 통해 일정 상담이 가능합니다. My Note의 AI는 사용자의 요구사항을 정확히 이해하고, 필요한 조언을 제공합니다.
              </p>
            </div>
          </div>
          <div className="slide">
            <div className="inner layout-ws">
              <p className="slide-p">효과적인 스케쥴 관리로, 하루를 더욱 생산적으로 만들어보세요. My Note와 함께라면 가능합니다.</p>
            </div>
          </div>
          <div className="progress"></div>
        </section>
      </div>

      <section className="contact">
        <div className="inner-contact">
          <div className="line-top"></div>
          <div className="layout-ws">
            <div className="mask">
              <h4>오늘 바로 시작하세요.</h4>
            </div>
            <a href="#" className="cta">
              <div className="mask">
                <span>리스트에 추가하기</span>
              </div>
            </a>
            <p className="contact-desc">
              My Note의 최신 기능에 대한 높은 관심으로 인해, 우리는 독점적인 대기 목록을 시작했습니다. 이를 통해 고객님께서는 새로운 기능을
              가장 먼저 경험하실 수 있습니다.
            </p>
          </div>
          <div className="line-bottom"></div>
        </div>
      </section>
      <section className="loading-screen relative">
        <Link href="/dashboard">
          <svg width="106" height="106" viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer">
            <path
              d="M53 44.1668L35.3333 19.4335L42.4 8.8335H63.6L70.6667 19.4335L53 44.1668ZM68.4583 30.0335L63.1583 37.5418C72.875 41.5168 79.5 50.7918 79.5 61.8335C79.5 68.8617 76.708 75.6021 71.7383 80.5718C66.7686 85.5415 60.0282 88.3335 53 88.3335C45.9718 88.3335 39.2314 85.5415 34.2617 80.5718C29.2919 75.6021 26.5 68.8617 26.5 61.8335C26.5 50.7918 33.125 41.5168 42.8417 37.5418L37.5417 30.0335C25.6167 35.7752 17.6667 47.7002 17.6667 61.8335C17.6667 71.2045 21.3893 80.1917 28.0156 86.8179C34.6418 93.4442 43.629 97.1668 53 97.1668C62.371 97.1668 71.3581 93.4442 77.9844 86.8179C84.6107 80.1917 88.3333 71.2045 88.3333 61.8335C88.3333 47.7002 80.3833 35.7752 68.4583 30.0335Z"
              fill="#fff"
            />
          </svg>
          <span className="absolute left-[50%] top-[60%] translate-x-[-50%] translate-y-[-50%]">Go to your Dashboard</span>
        </Link>
      </section>
    </div>
  );
}
