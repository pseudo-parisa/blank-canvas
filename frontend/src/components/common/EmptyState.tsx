interface EmptyStateProps {
    title: string;
    description?: string;
}

function EmptyState({
    title,
    description,
}: EmptyStateProps) {
    return (
        <div className="border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
            <h2 className="serif text-3xl text-neutral-900">
                {title}
            </h2>

            {description && (
                <p className="mx-auto mt-3 max-w-md text-sm text-neutral-500">
                    {description}
                </p>
            )}
        </div>
    );
}

export default EmptyState;