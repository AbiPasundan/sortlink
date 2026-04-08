import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { jwtDecode } from "jwt-decode";
import * as yup from 'yup';
import { FaLink, FaArrowLeft, FaRegEye, FaChartLine, FaQrcode } from 'react-icons/fa';
import { IoMdFlash } from 'react-icons/io';
import { useCreateSortLinkMutation } from '../feature/api';

const schema = yup.object().shape({
    OriginalURL: yup
        .string()
        .url('Harus berupa URL yang valid (http:// atau https://)')
        .required('Destination URL wajib diisi'),
    customSlug: yup.string().optional(),
});

function CardSortLink({ icon, title, desc }) {
    return (
        <div className="flex items-start gap-4">
            <div className="bg-orange-100 text-orange-600 p-3 rounded-full shrink-0 mt-1">
                {icon}
            </div>
            <div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">{title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}

export default function SortLink() {
    const [createSortLink, { isLoading }] = useCreateSortLinkMutation();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            OriginalURL: '',
            customSlug: '',
        },
    });

    const token = localStorage.getItem("token")
    const decodedToken = token ? jwtDecode(token) : null;
    console.log(decodedToken.user_id);


    const onSubmit = async (data) => {

        // console.log(data);
        // console.log(data.OriginalURL);
        // console.log(data.customSlug);
        try {
            const payload = {
                user_id: decodedToken.user_id,
                original_url: data.OriginalURL,
                slug: data.customSlug
            };
            await createSortLink(payload).unwrap();
            reset();
            // console.log("Short link created successfully!");
        } catch (err) {
            console.error("Failed to create short link:", err);
        }
    };

    const currentSlug = watch('customSlug');

    return (
        <main className="grow max-w-3xl mx-auto w-full px-6 py-10">
            <button className="flex items-center gap-2 text-blue-600 font-medium text-sm mb-6 hover:underline">
                <FaArrowLeft /> Back to Dashboard
            </button>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Short Link</h2>
                <p className="text-gray-500 text-sm">Transform your long URLs into clean, manageable assets.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <div>
                        <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2">
                            DESTINATION URL <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLink className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="https://example.com/your-long-url-here"
                                {...register('OriginalURL')}
                                disabled={isLoading}
                                className={`block w-full pl-10 pr-3 py-3 border ${errors.OriginalURL ? 'border-red-500' : 'border-gray-200'
                                    } rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors sm:text-sm disabled:opacity-50`}
                            />
                        </div>
                        {errors.OriginalURL ? (
                            <p className="mt-1 text-xs text-red-500 italic">{errors.OriginalURL.message}</p>
                        ) : (
                            <p className="mt-2 text-xs text-gray-400 italic">Ensure your URL starts with http:// or https://</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2">
                            CUSTOM SLUG (OPTIONAL)
                        </label>
                        <div className="flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-gray-500 sm:text-sm">
                                short.link/
                            </span>
                            <input
                                type="text"
                                placeholder="my-custom-slug"
                                {...register('customSlug')}
                                disabled={isLoading}
                                className="flex-1 block w-full min-w-0 px-3 py-3 rounded-none rounded-r-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm disabled:opacity-50"
                            />
                        </div>
                        <p className="mt-2 text-xs text-gray-400 italic">Leave blank to generate a random unique identifier.</p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-blue-800 text-xs font-bold tracking-wider">
                            <FaRegEye className="text-sm" /> LIVE PREVIEW
                        </div>
                        <p className="text-sm text-gray-700">
                            <span>Your short link will be: </span>
                            <span className="font-medium text-blue-600">
                                https://short.link/{currentSlug || 'my-custom-slug'}
                            </span>
                        </p>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-md flex items-center gap-2 transition-colors text-sm shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"  >
                            {isLoading ? 'Creating...' : 'Create Link'} <IoMdFlash className="text-lg" />
                        </button>
                        <button type="button" className="text-gray-500 hover:text-gray-800 font-medium py-2 px-4 transition-colors text-sm">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
                <CardSortLink icon={<FaChartLine className="text-xl" />} title="Real-time Analytics" desc="Track every click, geographical location, and referral source instantly." />
                <CardSortLink icon={<FaQrcode className="text-xl" />} title="Auto-generated QR" desc="Every link automatically creates a high-resolution QR code for print." />
            </div>
        </main>
    )
}