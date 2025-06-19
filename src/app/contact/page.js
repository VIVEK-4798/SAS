"use client";
import { useEffect, useState } from "react";
import { useProfile } from "../../components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";

const ContactFeedbackPage = () => {
  const { loading: profileLoading, data: profileData } = useProfile();  
  
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    fetch("/api/contact")
      .then(res => res.json())
      .then(data => {
        setFeedbackList(data);
      });
  }, []);

  if (profileLoading) return "Loading user info...";
  if (!profileData) return "Not authorized";

  return (
    <section className="mt-8 max-w-4xl mx-auto">
      <UserTabs isAdmin={true} />
      <h1 className="text-xl font-semibold mt-10 mb-4">Contact Feedback</h1>

      {feedbackList.length === 0 ? (
        <p className="text-gray-600">No feedback submitted yet.</p>
      ) : (
        feedbackList.map((feedback, index) => (
          <div
            key={feedback._id || index}
            className="bg-gray-100 rounded-lg p-4 mb-4 shadow-sm"
          >
            <div className="font-medium text-lg">{feedback.name}</div>
            <div className="text-sm text-gray-600 mb-2">{feedback.email}</div>
            <div className="text-gray-800">{feedback.message}</div>
          </div>
        ))
      )}
    </section>
  );
};

export default ContactFeedbackPage;
