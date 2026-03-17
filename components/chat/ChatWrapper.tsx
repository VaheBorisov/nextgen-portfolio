import { defineQuery } from 'next-sanity';

import { sanityFetch } from '@/sanity/lib/live';

import LazyChat from '@/components/chat/LazyChat';
import SidebarToggle from '@/components/SidebarToggle';

const CHAT_PROFILE_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    firstName,
    lastName,
    headline,
    shortBio,
    email,
    phone,
    location,
    availability,
    socialLinks,
    yearsOfExperience,
    profileImage
  }`);

export default async function ChatWrapper() {
  const { data: profile } = await sanityFetch({ query: CHAT_PROFILE_QUERY });

  return (
    <div className="h-full w-full">
      <div className="md:hidden p-2 sticky top-0 z-10">
        <SidebarToggle />
      </div>

      <LazyChat profile={profile} />
    </div>
  );
}
