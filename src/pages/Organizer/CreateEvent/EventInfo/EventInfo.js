import React, { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import './EventInfo.css';

function EventInfo ({event, HandleEventDataChange})
{
    const [eventData, setEventData] = useState(event);
    
    const HandleEventDataChangeInChild = (key, value) =>{
        setEventData((prev) =>({
            ...prev,
            [key]: value
        }))
    }
    
    return (
        <div className="space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-secondary-700 dark:text-white mb-2">
                    Event Information
                </h2>
                <p className="text-secondary-600 dark:text-gray-300">
                    Fill in the details about your event
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Banner Upload */}
                    <div>
                        <label className="block text-sm font-medium text-secondary-700 dark:text-white mb-2">
                            Event Banner *
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    HandleEventDataChangeInChild("banner", e.target.files[0]);
                                    HandleEventDataChange("banner", e.target.files[0]);
                                }}
                                className="block w-full text-sm text-secondary-600 dark:text-gray-300 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-primary-900 dark:file:text-primary-300 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            {eventData.banner && (
                                <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                                    ✓ Banner selected: {eventData.banner.name}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Seat Map Upload */}
                    <div>
                        <label className="block text-sm font-medium text-secondary-700 dark:text-white mb-2">
                            Seat Map *
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    HandleEventDataChangeInChild("seatMap", e.target.files[0]);
                                    HandleEventDataChange("seatMap", e.target.files[0]);
                                }}
                                className="block w-full text-sm text-secondary-600 dark:text-gray-300 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-primary-900 dark:file:text-primary-300 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            {eventData.seatMap && (
                                <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                                    ✓ Seat map selected: {eventData.seatMap.name}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Date and Time */}
                    <div>
                        <label className="block text-sm font-medium text-secondary-700 dark:text-white mb-2">
                            Date and Time *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="date"
                                    value={eventData.date ? eventData.date.toISOString().split('T')[0] : ''}
                                    onChange={(e) => {
                                        const newDate = new Date(e.target.value);
                                        HandleEventDataChangeInChild("date", newDate);
                                        HandleEventDataChange("date", newDate);
                                    }}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-secondary-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <input
                                    type="time"
                                    value={eventData.time ? eventData.time.toTimeString().slice(0, 5) : ''}
                                    onChange={(e) => {
                                        const [hours, minutes] = e.target.value.split(':');
                                        const newTime = new Date();
                                        newTime.setHours(parseInt(hours), parseInt(minutes), 0);
                                        HandleEventDataChangeInChild("time", newTime);
                                        HandleEventDataChange("time", newTime);
                                    }}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-secondary-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Event Name */}
                    <div>
                        <label className="block text-sm font-medium text-secondary-700 dark:text-white mb-2">
                            Event Name *
                        </label>
                        <input
                            type="text"
                            value={eventData.name || ''}
                            onChange={(e) => { 
                                HandleEventDataChangeInChild("name", e.target.value);
                                HandleEventDataChange("name", e.target.value);
                            }}
                            placeholder="Enter event name"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-secondary-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-secondary-700 dark:text-white mb-2">
                            Location *
                        </label>
                        <input
                            type="text"
                            value={eventData.location || ''}
                            onChange={(e) => { 
                                HandleEventDataChangeInChild("location", e.target.value); 
                                HandleEventDataChange("location", e.target.value);
                            }}
                            placeholder="Enter event location"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-secondary-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-secondary-700 dark:text-white mb-2">
                            Category *
                        </label>
                        <select
                            value={eventData.category || ''}
                            onChange={(e) => {
                                HandleEventDataChangeInChild("category", e.target.value);
                                HandleEventDataChange("category", e.target.value);
                            }}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-secondary-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option value="" disabled>Select category</option>
                            <option value="Sport">Sport</option>
                            <option value="Music">Music</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Description Preview */}
                    <div>
                        <label className="block text-sm font-medium text-secondary-700 dark:text-white mb-2">
                            Event Preview
                        </label>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                                    {eventData.banner ? (
                                        <img 
                                            src={URL.createObjectURL(eventData.banner)} 
                                            alt="Banner preview" 
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-secondary-700 dark:text-white">
                                        {eventData.name || 'Event Name'}
                                    </h3>
                                    <p className="text-sm text-secondary-600 dark:text-gray-300">
                                        {eventData.location || 'Location'} • {eventData.category || 'Category'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-white mb-2">
                    Event Description
                </label>
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
                    <ReactQuill 
                        value={eventData.description || ''}
                        onChange={(value) => {
                            HandleEventDataChangeInChild("description", value);
                            HandleEventDataChange("description", value);
                        }}
                        placeholder="Describe your event..."
                        theme="snow"
                        style={{
                            backgroundColor: 'transparent'
                        }}
                        modules={{
                            toolbar: [
                                [{ 'header': [1, 2, false] }],
                                ['bold', 'italic', 'underline'],
                                ['link'],
                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                ['clean']
                            ],
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default EventInfo;