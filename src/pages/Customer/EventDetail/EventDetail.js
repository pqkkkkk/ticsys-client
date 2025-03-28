import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EventDetail.module.css"
import { GetEventWithTicketsByIdApi } from "../../../services/api/EventApi";
import { CreateCommentApi, GetCommentsApi } from "../../../services/api/CommentApi";
import { GetUser } from "../../../services/UserStorageService";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
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
        <div className={styles["container"]}>

            <div className={styles["event-header"]}>
                <div className={styles["details"]}>
                    <h1>{event.name}</h1>
                    <p><i class="far fa-calendar-alt"></i>{event.time} - {event.date} </p>
                    <p><i class="fas fa-map-marker-alt"></i> {event.location}</p>
                    <p className={styles["price"]}>From {minPriceOfTicket?.toLocaleString('vi-VN')} đ</p>
                    <button disabled>Online booking closed</button>
                </div>
                <img src={event.bannerPath} alt="Event banner"/>
            </div>

            <div className={styles["content"]}>
                <div className={styles["about"]}>
                    <h2>About</h2>
                    <ReactQuill value={event.description} readOnly theme="bubble"/>
                </div>
                <div className={styles["ticket-info"]}>
                    <h2>Ticket Information</h2>
                    <div className={styles["book-now-section"]}>
                        <div className={styles["time"]}>
                            <i class="fas fa-chevron-down"></i>
                            <span>{event.time} - {event.date}</span>
                        </div>
                        <button onClick={HandleBookNow} className={styles["book-now-button"]}>Book now</button>
                    </div>

                    {tickets.map((ticket) => (
                        <div className={styles["ticket"]}>
                            <div>
                                <p class="text-gray-500">{ticket.name}</p>
                                <p class="font-semibold">{ticket.service}</p>
                            </div>
                            <div className={styles["text-right"]}>
                                <p className={styles["price"]}>{ticket?.price?.toLocaleString('vi-VN')} đ</p>
                                <button disabled>Online booking closed</button>
                            </div>
                        </div>
                        ))}
                </div>
                <div className={styles["organizer"]}>
                    <h2>Organizer</h2>
                    <div className={styles["info"]}>
                        <img src="https://storage.googleapis.com/a1aa/image/51cL97iwlvqIZueWm9MlY2WLi_kL3NQ0TXifSDBf8U0.jpg" alt="Organizer logo"/>
                        <div className={styles["text"]}>
                            <p class="font-semibold">SÂN KHẤU NGHỆ THUẬT TRƯƠNG HỒNG MINH</p>
                            <p class="text-gray-500">Nhà hát Biểu Diễn Nghệ Thuật Trương Hồng Minh</p>
                        </div>
                    </div>
                </div>
                <div className={styles["comment-container"]}>
                    <h2>Question about this event</h2>
                    <div className={styles["input-container"]}>
                        <img src="https://placehold.co/40x40" alt="User profile picture"/>
                        <input type="text" placeholder="Ask for support..."
                                value={enteredComment} onChange={(e) => setEnteredComment(e.target.value)}/>
                        <button onClick={HandlePostComment}>Post</button>
                    </div>
                    {comments.map((comment) => (
                        <div className={styles["comment-item"]}>
                            <div className={styles["comment"]}>
                                <div className={styles["header"]}>
                                    <img src="https://placehold.co/40x40" alt="Bessie Cooper profile picture"/>
                                    <div className={styles["info"]}>
                                        <p className={styles["name"]}>{comment.senderId}</p>
                                        <p className={styles["time"]}>1h ago</p>
                                    </div>
                                    <div className={styles["options"]}>
                                        <i class="fas fa-ellipsis-h"></i>
                                    </div>
                                </div>
                                <div className={styles["content"]}>
                                    {comment.content}
                                </div>
                                <div className={styles["actions"]}>
                                    <i class="fas fa-thumbs-up"></i> 2
                                    <button onClick={() => HandleDisplayReplyBox(comment.id)}>{comment.isReplyBoxDisplayed === false ? "Reply" : "Close"}</button>
                                    {comment.childCount !== 0 && 
                                        <button onClick={() => HandleViewReplies(comment.id)}>{comment.isShowingReplies === false ? "View Replies" : "Close"}</button>}
                                </div>
                            </div>
                            {comment.isShowingReplies && comment.child.map((reply) => (
                                <div className={styles["reply-container"]}>
                                    <div className={styles["comment"]}>
                                        <div className={styles["header"]}>
                                            <img src="https://placehold.co/40x40" alt="Marvin McKinney profile picture"/>
                                            <div className={styles["info"]}>
                                                <p className={styles["name"]}>{reply.senderId}</p>
                                                <p className={styles["time"]}>2h ago</p>
                                            </div>
                                            <div className={styles["options"]}>
                                                <i class="fas fa-ellipsis-h"></i>
                                            </div>
                                        </div>
                                        <div className={styles["content"]}>
                                            {reply.content}
                                        </div>
                                    </div>
                                </div>
                                ))}
                            {comment.isReplyBoxDisplayed && (
                                <div className={styles["reply-box"]}>
                                    <div className={styles["input-container"]}>
                                        <img src="https://placehold.co/40x40" alt="User profile picture"/>
                                        <input type="text" placeholder="Type something..."
                                                value={enteredReply} onChange={(e) => setEnteredReply(e.target.value)}/>
                                        <button onClick={()=> HandleReplyComment(comment.id)}>Post</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EventDetail;