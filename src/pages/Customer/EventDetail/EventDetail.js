import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetEventWithTicketsByIdApi } from "../../../services/api/EventApi";
import { CreateCommentApi, GetCommentsApi } from "../../../services/api/CommentApi";
import { GetUser } from "../../../services/UserStorageService";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import ThemeToggle from "../../../components/ThemeToggle/ThemeToggle";
function EventDetail()
{
    const navigate = useNavigate();
    const {eventId} = useParams();
    const user = GetUser();

    const [event, setEvent] = useState({});
    const [tickets, setTickets] = useState([]);
    const [minPriceOfTicket, setMinPriceOfTicket] = useState(0);
    const [comments, setComments] = useState([]);
    const [enteredComment, setEnteredComment] = useState("");
    const [enteredReply, setEnteredReply] = useState("");

    useEffect(() => {
        const fetchEvent = async () => {
            let [eventData, commentData] = await Promise.all([GetEventWithTicketsByIdApi(eventId), GetCommentsApi(null,eventId,null)]);
            setEvent(eventData.event);
            setTickets(eventData.tickets);
            setMinPriceOfTicket(eventData.minPriceOfTicket);
            commentData = commentData.map(comment => {
                return {
                    ...comment,
                    isReplyBoxDisplayed: false,
                    isShowingReplies: false,
                    child:[]
                }
            });
            setComments(commentData);
        };
        fetchEvent();
    }, [eventId]);

    const HandleBookNow = () => {
        navigate(`/booking/${eventId}/select-ticket`);
    }
    const HandlePostComment = async () => {
        if(user === null){
            alert("Please login to post question");
            return;
        }
        const createCommentRequest = {
            eventId: eventId,
            content: enteredComment,
            senderId : user.userName,
            parentId: null
        };
        const response = await CreateCommentApi(createCommentRequest);

        if(response && response !== -1)
        {
            setEnteredComment("");
            const comment = {
                ...createCommentRequest,
                id: response
            }
            setComments([...comments, comment]);
        }
    }
    const HandleDisplayReplyBox = (commentId) => {
        setComments(comments.map(comment => {
            if(comment.id === commentId){
                return {
                    ...comment,
                    isReplyBoxDisplayed: !comment.isReplyBoxDisplayed,
                    isShowingReplies: false
                }
            }
            return comment;
        }))
    };
    const HandleReplyComment = async (parentId) => {
        if(user === null){
            alert("Please login to post question");
            return;
        }
        const createCommentRequest = {
            eventId: eventId,
            content: enteredReply,
            senderId : user.userName,
            parentId: parentId
        };
        const response = await CreateCommentApi(createCommentRequest);

        if(response && response !== -1)
        {
            setEnteredComment("");
            const comment = {
                ...createCommentRequest,
                id: response
            }
            setComments(comments.map(item => {
                if(item.id === parentId){
                    return {
                        ...item,
                        childCount: item.childCount + 1,
                        child: [...item.child, comment],
                        isReplyBoxDisplayed: false
                    }
                }
                return comment;
            }));
        }
    }
    const HandleViewReplies = async (commentId) => {
        const replies = await GetCommentsApi(null,eventId,commentId);
        setComments(comments.map(comment => {
            if(comment.id === commentId){
                return {
                    ...comment,
                    childCount: replies.length,
                    child: replies,
                    isShowingReplies: !comment.isShowingReplies,
                }
            }
            return comment;
        }))
    };
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <ThemeToggle />
            
            {/* Event Header */}
            <div className="relative bg-white dark:bg-gray-800 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Event Details */}
                        <div className="order-2 lg:order-1">
                            <div className="mb-4">
                                <button 
                                    onClick={() => navigate("/")}
                                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-4 transition-colors duration-200"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Events
                                </button>
                            </div>
                            
                            <h1 className="text-3xl lg:text-4xl font-bold text-secondary-700 dark:text-white mb-4">{event.name}</h1>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center text-secondary-600 dark:text-gray-300">
                                    <svg className="w-5 h-5 mr-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="font-medium">{event.time} - {event.date}</span>
                                </div>
                                
                                <div className="flex items-center text-secondary-600 dark:text-gray-300">
                                    <svg className="w-5 h-5 mr-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{event.location}</span>
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                                    From {minPriceOfTicket?.toLocaleString('vi-VN')} đ
                                </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button 
                                    onClick={HandleBookNow}
                                    className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
                                >
                                    Book Now
                                </button>
                                <button 
                                    disabled
                                    className="px-8 py-3 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 font-semibold rounded-lg cursor-not-allowed"
                                >
                                    Online booking closed
                                </button>
                            </div>
                        </div>
                        
                        {/* Event Image */}
                        <div className="order-1 lg:order-2">
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                <img 
                                    src={event.bannerPath} 
                                    alt="Event banner"
                                    className="w-full h-64 lg:h-96 object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Event Description */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-secondary-700 dark:text-white mb-6">About This Event</h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <ReactQuill value={event.description} readOnly theme="bubble"/>
                            </div>
                        </div>
                        
                        {/* Organizer Info */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-secondary-700 dark:text-white mb-6">Organizer</h2>
                            <div className="flex items-center space-x-4">
                                <img 
                                    src="https://storage.googleapis.com/a1aa/image/51cL97iwlvqIZueWm9MlY2WLi_kL3NQ0TXifSDBf8U0.jpg" 
                                    alt="Organizer logo"
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-lg text-secondary-700 dark:text-white">SÂN KHẤU NGHỆ THUẬT TRƯƠNG HỒNG MINH</p>
                                    <p className="text-secondary-600 dark:text-gray-300">Nhà hát Biểu Diễn Nghệ Thuật Trương Hồng Minh</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Ticket Information Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 sticky top-8">
                            <h2 className="text-2xl font-bold text-secondary-700 dark:text-white mb-6">Ticket Information</h2>
                            
                            <div className="mb-6">
                                <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-6 mb-4">
                                    <div className="flex items-center mb-2">
                                        <svg className="w-4 h-4 mr-2 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                        <span className="text-secondary-700 dark:text-white font-medium">{event.time} - {event.date}</span>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={HandleBookNow}
                                    className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 mb-4"
                                >
                                    Book now
                                </button>
                            </div>
                            
                            {/* Ticket Types */}
                            <div className="space-y-4">
                                {tickets.map((ticket, index) => (
                                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:border-primary-300 dark:hover:border-primary-600 transition-colors duration-200">
                                        <div className="mb-2">
                                            <p className="text-secondary-600 dark:text-gray-300 text-sm">{ticket.name}</p>
                                            <p className="font-semibold text-secondary-700 dark:text-white">{ticket.service}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                                                {ticket?.price?.toLocaleString('vi-VN')} đ
                                            </span>
                                            <button 
                                                disabled
                                                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 text-sm rounded-lg cursor-not-allowed"
                                            >
                                                Online booking closed
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Comments Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-secondary-700 dark:text-white mb-6">Question about this event</h2>
                    
                    {/* Comment Input */}
                    <div className="flex items-start space-x-4 mb-8">
                        <img 
                            src="https://placehold.co/40x40" 
                            alt="User avatar"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 flex space-x-3">
                            <input 
                                type="text" 
                                placeholder="Ask for support..."
                                value={enteredComment} 
                                onChange={(e) => setEnteredComment(e.target.value)}
                                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-secondary-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            <button 
                                onClick={HandlePostComment}
                                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                    
                    {/* Comments List */}
                    <div className="space-y-6">
                        {comments.map((comment, index) => (
                            <div key={index} className="border-b border-gray-200 dark:border-gray-600 pb-6 last:border-b-0">
                                <div className="flex items-start space-x-4">
                                    <img 
                                        src="https://placehold.co/40x40" 
                                        alt="Commenter avatar"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-3">
                                                <span className="font-semibold text-secondary-700 dark:text-white">{comment.senderId}</span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">1h ago</span>
                                            </div>
                                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" />
                                                </svg>
                                            </button>
                                        </div>
                                        
                                        <div className="text-secondary-600 dark:text-gray-300 mb-3">
                                            {comment.content}
                                        </div>
                                        
                                        <div className="flex items-center space-x-6">
                                            <button className="flex items-center space-x-2 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                </svg>
                                                <span className="text-sm">2</span>
                                            </button>
                                            
                                            <button 
                                                onClick={() => HandleDisplayReplyBox(comment.id)}
                                                className="text-sm text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                                            >
                                                {comment.isReplyBoxDisplayed === false ? "Reply" : "Close"}
                                            </button>
                                            
                                            {comment.childCount !== 0 && 
                                                <button 
                                                    onClick={() => HandleViewReplies(comment.id)}
                                                    className="text-sm text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                                                >
                                                    {comment.isShowingReplies === false ? "View Replies" : "Close"}
                                                </button>
                                            }
                                </div>
                                        </div>
                                        
                                        {/* Replies */}
                                        {comment.isShowingReplies && comment.child.map((reply, replyIndex) => (
                                            <div key={replyIndex} className="ml-8 mt-4 border-l-2 border-gray-200 dark:border-gray-600 pl-4">
                                                <div className="flex items-start space-x-3">
                                                    <img 
                                                        src="https://placehold.co/40x40" 
                                                        alt="Commenter avatar"
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center space-x-2">
                                                                <span className="font-medium text-secondary-700 dark:text-white text-sm">{reply.senderId}</span>
                                                                <span className="text-xs text-gray-500 dark:text-gray-400">2h ago</span>
                                                            </div>
                                                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div className="text-secondary-600 dark:text-gray-300 text-sm">
                                                            {reply.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        
                                        {/* Reply Box */}
                                        {comment.isReplyBoxDisplayed && (
                                            <div className="mt-4 ml-8">
                                                <div className="flex items-start space-x-3">
                                                    <img 
                                                        src="https://placehold.co/40x40" 
                                                        alt="User avatar"
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                    <div className="flex-1 flex space-x-3">
                                                        <input 
                                                            type="text" 
                                                            placeholder="Type something..."
                                                            value={enteredReply} 
                                                            onChange={(e) => setEnteredReply(e.target.value)}
                                                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-secondary-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                                                        />
                                                        <button 
                                                            onClick={()=> HandleReplyComment(comment.id)}
                                                            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200 text-sm"
                                                        >
                                                            Post
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default EventDetail;