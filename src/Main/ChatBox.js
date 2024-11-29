import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { fetchdata } from "../Redux/Userdatas";
import { useNavigate } from "react-router";
import { selectUser } from "../Redux/UserSlice";
import { footContext } from "../Context";
import "./ChatBox.css";

const ChatBox = () => {
  const navigate = useNavigate();
  const { socket, messageList, setMessageList, setShowChat } = useContext(footContext);
  const dispatch = useDispatch();
  const DataList = useSelector((state) => state.datas);
  const user = useSelector(selectUser);

  const [room, setRoom] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    dispatch(fetchdata());
  }, [dispatch]);

  const { id } = useParams();
  const currentUser = (DataList.data || []).find((p) => p.id === parseInt(id));

  const handleJoinRoom = () => {
    navigate("/HomePage");
  };

  useEffect(() => {
    if (socket && currentUser) {
      const senderId = currentUser.id;
      const room = `room_${Math.min(senderId, user.id)}_${Math.max(senderId, user.id)}`;
      setRoom(room);

      const username = currentUser.name;
      setUsername(username);
      setShowChat(true);

      socket.emit("join_room", room, user.id);

      socket.on("user_joined", (userId) => {
        console.log(`User with ID ${userId} joined the room`);
      });

      socket.on("receive_message", (data) => {
        if (Array.isArray(data)) {
          setMessageList(data);
        } else {
          setMessageList((list) => {
            const isDuplicate = list.some((msg) => msg.message === data.message);
            return isDuplicate ? list : [...list, data];
          });
        }
      });
    }
  }, [socket, id, currentUser, user.id]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        username: username,
        message: currentMessage,
        time: new Date(Date.now()).getTime(),
      };

      axios
        .post("http://localhost:3001/send_message", messageData)
        .then((response) => {
          console.log("Message sent to server:", response.data);
        })
        .catch((error) => {
          console.error("Error sending message to server:", error);
        });

      await socket.emit("send_message", messageData);
      setCurrentMessage(""); // Clear the input field after sending the message
    }
  };

  const UserId = (DataList.data || []).find((p) => p.id === parseInt(id));

  if (!UserId) {
    return <div>Please select a valid user to chat with.</div>;
  }

  return (
    <div className="col-lg-8 col-xxl-9">
      <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
        <div className="card-body h-100">
          <div className="d-sm-flex justify-content-between align-items-center">
            <div className="d-flex mb-2 mb-sm-0" key={UserId.id}>
              <div className="flex-shrink-0 avatar me-2">
                <img
                  className="avatar-img rounded-circle"
                  src={`http://localhost:3001/${UserId.image}`}
                  alt=""
                />
              </div>
              <div className="d-block flex-grow-1">
                <h6 className="mb-0 mt-1">{UserId.name}</h6>
                <div className="small text-secondary">
                  <i className="fa-solid fa-circle text-success me-1"></i>
                  Online
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <button onClick={handleJoinRoom} className="btn btn-sm btn-primary ms-2">
                Video Call
              </button>
            </div>
          </div>

          <div className="chat-conversation-content custom-scrollbar">
            {messageList.map((messageContent, index) => (
              <div className="" key={index}>
                <div className="text-center small my-2">
                  {new Date(messageContent.time).toLocaleString()}
                </div>
                <div id={username === messageContent.username ? "you" : "other"}>
                  {messageContent.message}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-footer">
          <div className="d-sm-flex align-items-end">
            <textarea
              className="form-control mb-sm-0 mb-3"
              placeholder="Type a message"
              rows="1"
              value={currentMessage}
              onChange={(event) => setCurrentMessage(event.target.value)}
            ></textarea>
            <button className="btn btn-sm btn-primary ms-2" onClick={sendMessage}>
              <i className="fa-solid fa-paper-plane fs-6"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
