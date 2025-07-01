import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {  deleteAllMessages } from "../../features/message";

export default function RemoveAll() {
    const dispatch = useDispatch();
    const showData = useSelector((state) => state.message.showData);
    const token = useSelector((state) => state.auth.token);

    const sendRequest = async (url, method, successMessage, errorMessage) => {
        try {
            const confirmAction = window.confirm(successMessage);
            if (!confirmAction) return;

            await axios({
                url: `${import.meta.env.VITE_BASE_URL}${url}`,
                method,
                headers: {
                    authorization: `${import.meta.env.VITE_BEARER_KEY} ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            dispatch(deleteAllMessages());
        } catch (error) {
            alert(errorMessage + ": " + (error.response ? error.response.data.message : "خطأ غير معروف"));
        }
    };

    // دالة أرشفة جميع المهام
    const handleArchiveAll = () => {
        sendRequest(
            "/message/archive-all",
            "put",
            "هل أنت متأكد من أرشفة جميع المهام؟",
            "فشل أرشفة المهام"
        );
    };

    // دالة حذف جميع المهام
    const handleDeleteAll = () => {
        sendRequest(
            "/message/delete-all",
            "delete",
            "هل أنت متأكد من حذف جميع المهام نهائيًا؟",
            "فشل حذف المهام"
        );
    };

    // دالة استعادة جميع المهام
    const handleRestoreAll = () => {
        sendRequest(
            "/message/restore-all",
            "put",
            "هل أنت متأكد من استعادة جميع المهام المؤرشفة؟",
            "فشل استعادة المهام"
        );
    };

    return (
        <div className="pb-2">
            {showData === 'all'  &&
                <button
                    onClick={handleArchiveAll}
                    className="bg-red-500 text-white font-bold px-2 rounded-lg"
                >
                    Archive All
                </button>
 } 
 {
    showData === 'archive'  &&
                <div className="flex justify-center items-center gap-3">
                    <button
                        onClick={handleDeleteAll}
                        className="bg-red-500 text-white font-bold px-2 rounded-lg"
                    >
                        Delete All
                    </button>
                    <button
                        onClick={handleRestoreAll}
                        className="bg-green-500 text-white font-bold px-2 rounded-lg"
                    >
                        Restore All
                    </button>
                </div>
            }

        </div>
    );
}
