'use client';

import { useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";

export default function ProfilePage() {
  const { user } = useUser();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Update form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    const firstName = formData.firstName;
    const lastName = formData.lastName;
    try {
      await user?.update({
        firstName: firstName,
        lastName: lastName,
      });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match!' });
      setIsLoading(false);
      return;
    }

    try {
      await user?.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setShowPasswordForm(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update password. Please check your current password and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  console.log(user);

  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                  <p className="mt-1 text-gray-500">
                    Manage your account settings and preferences
                  </p>
                </div>
                <div className="flex gap-4">
                  <Link 
                    href="/dashboard" 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                  >
                    Back to Dashboard
                  </Link>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
              </div>
            </div>

            {/* Message Display */}
            {message.text && (
              <div className={`mb-8 p-4 rounded-md ${
                message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {message.text}
              </div>
            )}

            {/* Profile Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* User Info Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="text-center">
                    <div className="mx-auto h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {user?.imageUrl ? (
                        <img
                          src={user.imageUrl}
                          alt={user.fullName || 'Profile'}
                          className="h-32 w-32 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl text-gray-500">
                          {user?.firstName?.[0] || 'U'}
                        </span>
                      )}
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-gray-900">
                      {user?.fullName || 'User'}
                    </h2>
                    <p className="text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
                  </div>
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Account Type</dt>
                        <dd className="mt-1 text-sm text-gray-900">Personal Account</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Member Since</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              {/* Profile Settings */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Profile Information</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-3 block w-full rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 disabled:bg-gray-100 disabled:text-gray-400 transition-all duration-200 text-base"

                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-3 block w-full rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 disabled:bg-gray-100 disabled:text-gray-400 transition-all duration-200 text-base"

                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        disabled
                        className="mt-3 block w-full rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 disabled:bg-gray-100 disabled:text-gray-400 transition-all duration-200 text-base"

                      />
                      <p className="mt-2 text-sm text-gray-500">
                        Email address cannot be changed. Contact support for assistance.
                      </p>
                    </div>
                    {isEditing && (
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                          {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    )}
                  </form>
                </div>

                {/* Security Settings */}
                <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Security Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Password</h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Last changed {user?.lastSignInAt ? new Date(user.lastSignInAt).toLocaleDateString() : 'N/A'}
                      </p>
                      {!showPasswordForm ? (
                        <button
                          onClick={() => setShowPasswordForm(true)}
                          className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Change Password
                        </button>
                      ) : (
                        <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4">
                          <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                              Current Password
                            </label>
                            <input
                              type="password"
                              name="currentPassword"
                              id="currentPassword"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              required
                              className="mt-3 block w-full rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 disabled:bg-gray-100 disabled:text-gray-400 transition-all duration-200 text-base"

                            />
                          </div>
                          <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                              New Password
                            </label>
                            <input
                              type="password"
                              name="newPassword"
                              id="newPassword"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              required
                              minLength={8}
                              className="mt-3 block w-full rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 disabled:bg-gray-100 disabled:text-gray-400 transition-all duration-200 text-base"
                            />
                          </div>
                          <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              name="confirmPassword"
                              id="confirmPassword"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordChange}
                              required
                              minLength={8}
                              className="mt-3 block w-full rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 disabled:bg-gray-100 disabled:text-gray-400 transition-all duration-200 text-base"
                            />
                          </div>
                          <div className="flex justify-end space-x-3">
                            <button
                              type="button"
                              onClick={() => {
                                setShowPasswordForm(false);
                                setPasswordData({
                                  currentPassword: '',
                                  newPassword: '',
                                  confirmPassword: '',
                                });
                              }}
                              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={isLoading}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                              {isLoading ? 'Updating...' : 'Update Password'}
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-4">You must be signed in to view this page.</p>
            <Link href="/sign-in" className="text-blue-600 hover:underline text-sm">
              Go to Sign In
            </Link>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
