'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'New York, USA',
    rating: 5,
    text: 'An absolutely breathtaking experience! From the moment we arrived, every detail exceeded our expectations. The staff went above and beyond to make our stay memorable.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
  },
  {
    name: 'Michael Chen',
    location: 'Singapore',
    rating: 5,
    text: 'The perfect blend of luxury and comfort. The spa treatments were divine, and the dining experience was world-class. We cannot wait to return!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
  },
  {
    name: 'Emma Williams',
    location: 'London, UK',
    rating: 5,
    text: 'This hotel sets the standard for luxury hospitality. The attention to detail, exceptional service, and stunning views made our anniversary truly unforgettable.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 id="testimonials-heading" className="mb-4 text-3xl font-bold text-[--navy] sm:text-4xl lg:text-5xl">
            Guest Experiences
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Hear from our valued guests about their unforgettable stays
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col rounded-lg bg-[--cream] p-8 shadow-lg"
            >
              <div className="mb-4 flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 text-[--gold]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="mb-6 flex-grow text-gray-700">
                <p>&ldquo;{testimonial.text}&rdquo;</p>
              </blockquote>

              <div className="flex items-center gap-4">
                <div
                  className="h-12 w-12 overflow-hidden rounded-full bg-gray-300"
                  style={{
                    backgroundImage: `url(${testimonial.avatar})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  role="img"
                  aria-label={`Photo of ${testimonial.name}`}
                />
                <div>
                  <p className="font-semibold text-[--navy]">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
