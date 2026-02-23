import { MdLocationOn, MdPhone, MdEmail, MdAccessTime } from 'react-icons/md';

const contactDetails = [
  {
    icon: MdLocationOn,
    title: 'Address',
    lines: ['Sports Academy Campus', '123 Stadium Road, Sports Nagar', 'Bangalore, Karnataka 560001'],
    color: 'text-red-500',
    bg: 'bg-red-100',
  },
  {
    icon: MdPhone,
    title: 'Phone',
    lines: ['+91 98765 43210', '+91 80 2345 6789'],
    color: 'text-green-500',
    bg: 'bg-green-100',
    links: ['tel:+919876543210', 'tel:+918023456789'],
  },
  {
    icon: MdEmail,
    title: 'Email',
    lines: ['info@sportsacademy.com', 'admissions@sportsacademy.com'],
    color: 'text-blue-500',
    bg: 'bg-blue-100',
    links: ['mailto:info@sportsacademy.com', 'mailto:admissions@sportsacademy.com'],
  },
  {
    icon: MdAccessTime,
    title: 'Working Hours',
    lines: ['Monday - Friday: 6:00 AM - 8:00 PM', 'Saturday: 6:00 AM - 6:00 PM', 'Sunday: 7:00 AM - 12:00 PM'],
    color: 'text-orange-500',
    bg: 'bg-orange-100',
  },
];

const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>

      {contactDetails.map((item) => (
        <div key={item.title} className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-12 h-12 ${item.bg} rounded-lg flex items-center justify-center`}>
            <item.icon className={`text-2xl ${item.color}`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
            {item.lines.map((line, index) => (
              <p key={index} className="text-gray-600 text-sm">
                {item.links && item.links[index] ? (
                  <a href={item.links[index]} className="hover:text-blue-600 transition-colors">
                    {line}
                  </a>
                ) : (
                  line
                )}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
