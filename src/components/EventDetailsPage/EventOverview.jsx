import { BiCalendar } from "react-icons/bi"
import { FaLocationDot } from "react-icons/fa6"
import { GrLanguage } from "react-icons/gr"
import { FaPeopleLine } from "react-icons/fa6"
import { formatDateWithTime } from "../../helpers/formatDate"
// import { formatName } from "../../helpers/formatName"
// import { Link } from "react-router-dom"
import AttendantsAvatars from "./AttendantsAvatars"

const EventOverview = ({
  startDate,
  addressId,
  maxParticipant,
  languages,
  totalParticipants,
  eventParticipantIds,
}) => {
  // const fakeParticipants = [
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  //   {
  //     joinStatus: "pending",
  //     _id: "671a1012930472fa12a8698a",
  //     userId: {
  //       _id: "6705950807d97dbaa93f1548",
  //       fullName: "Omer Faruk Capur",
  //       email: "omerrfarukcapur@gmail.com",
  //       userDetailsId: {
  //         _id: "6705950807d97dbaa93f154a",
  //         isFullNameDisplay: true,
  //         avatar: "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG",
  //       },
  //     },
  //     eventId: "6717b233ace2ba475d675632",
  //     isPending: false,
  //     isApproved: true,
  //     hasJoined: false,
  //     createdAt: "2024-10-24T09:14:58.867Z",
  //     updatedAt: "2024-10-24T09:17:07.424Z",
  //     __v: 0,
  //   },
  // ]
  console.log(eventParticipantIds)
  return (
    <>
      <div className="flex flex-col text-gray-2 space-y-4 border md:border-r md:border-b md:border-t-0 md:border-l-0 border-light-gray-3 rounded p-4 lg:px-0 lg:py-2 gap-y-7">
        <div className="font-medium text-[0.9rem] space-y-1">
          <div className="flex items-center space-x-2">
            <BiCalendar className="text-[1.25rem]" />
            <span>{formatDateWithTime(startDate)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaLocationDot className="text-[1.25rem]" />
            <span>
              {addressId?.city}, {addressId?.country}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaPeopleLine className="text-[1.25rem]" />
            <span>Max. {maxParticipant} people</span>
          </div>
          <div className="flex items-center space-x-2">
            <GrLanguage className="text-[1.25rem]" />
            {languages?.map((language, index) => (
              <span key={index}>
                {language}
                {index < languages?.length - 1 && <span>,</span>}
              </span>
            ))}
          </div>
        </div>
        {/* Attendants */}
        {/* <div>
          <h3 className="text-dark-gray-1 text-[1rem] font-semibold">
            Attendants ({totalParticipants}/{maxParticipant})
          </h3>
          <div className="avatars flex flex-wrap gap-8 py-2">
            {fakeParticipants?.map(({ userId }, index) => (
              <Link to={`/profile/${userId._id}`} key={index}>
                <img
                  src={userId?.userDetailsId?.avatar}
                  alt={formatName(userId?.fullName, userId?.userDetailsId?.isFullNameDisplay)}
                  className="participant-avatar w-8 h-8 rounded-full object-cover"
                />
              </Link>
            ))}
          </div>
        </div> */}
        <AttendantsAvatars
          participants={eventParticipantIds}
          totalParticipants={totalParticipants}
          maxParticipant={maxParticipant}
          avatarCount={6}
          gap={5}
        />
        {/* Buttons */}
        <div className="flex justify-center xl:justify-end  p-2 space-x-4">
          <button className="border border-gray-1 px-2 py-1 font-medium text-center w-[10rem] h-8 rounded-lg text-xs md:text-sm">
            Send Message
          </button>
          <button className="bg-primary-green text-white font-semibold px-2 py-1 text-center min-w-[100px] max-w-full h-8 rounded-lg text-xs md:text-sm">
            Join
          </button>
        </div>
      </div>
    </>
  )
}

export default EventOverview
