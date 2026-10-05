import { useEffect, useState, type FormEvent } from 'react';

import {
  createArtwork,
  deleteArtwork,
  getMyArtworks,
  updateArtwork,
  updateArtworkStatus,
  type Artwork,
  type ArtworkInput,
  type ArtworkStatus,
} from '../services/artworks';

const emptyForm: ArtworkInput = {
  title: '',
  description: '',
  medium: '',
};

// status labels
const statusLabels: Record<ArtworkStatus, string> = {
  DRAFT: 'Draft',
  PUBLISHED: 'Published',
  ARCHIVED: 'Archived',
};

export default function MyArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [form, setForm] = useState<ArtworkInput>(emptyForm);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // load the seller's artwork when the page first opens
  async function loadArtworks() {
    setLoading(true);
    setError('');

    try {
      const result = await getMyArtworks();
      setArtworks(result);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          'Unable to load your artwork. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadArtworks();
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  // reuse the same form for creating and editing artwork
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      if (editingId === null) {
        await createArtwork(form);
        setSuccess('Your artwork draft has been created.');
      } else {
        await updateArtwork(editingId, form);
        setSuccess('Your artwork has been updated.');
      }

      resetForm();
      await loadArtworks();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          'Unable to save your artwork. Please try again.',
      );
    } finally {
      setSaving(false);
    }
  }

  function startEditing(artwork: Artwork) {
    setEditingId(artwork.id);

    setForm({
      title: artwork.title,
      description: artwork.description,
      medium: artwork.medium ?? '',
      width: artwork.width ?? undefined,
      height: artwork.height ?? undefined,
    });

    setError('');
    setSuccess('');

    // bring the form into view on longer pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function changeStatus(
    artwork: Artwork,
    status: ArtworkStatus,
  ) {
    setError('');
    setSuccess('');

    try {
      await updateArtworkStatus(artwork.id, status);

      setSuccess(
        `Artwork ${statusLabels[status].toLowerCase()} successfully.`,
      );

      await loadArtworks();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          'Unable to change the artwork status.',
      );
    }
  }

  async function handleDelete(artwork: Artwork) {
    const confirmed = window.confirm(
      `Delete "${artwork.title}"? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setError('');
    setSuccess('');

    try {
      await deleteArtwork(artwork.id);

      if (editingId === artwork.id) {
        resetForm();
      }

      setSuccess('Artwork deleted successfully.');
      await loadArtworks();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          'Unable to delete this artwork.',
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f4f0] px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* page intro */}
        <header className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#9b8fa3]">
            Seller studio
          </p>

          <h1 className="font-serif text-4xl text-[#342c38] sm:text-5xl">
            My artwork
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-[#77717a]">
            Create and manage your collection. You can prepare drafts,
            publish artwork to the gallery, or archive pieces you no
            longer wish to display.
          </p>
        </header>

        {/* feedback messages */}
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800"
          >
            {Array.isArray(error) ? error.join(', ') : error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-800"
          >
            {success}
          </div>
        )}

        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* create/edit form */}
          <section className="rounded-3xl border border-[#e6e0e5] bg-white/80 p-6 shadow-sm sm:p-8">
            <h2 className="font-serif text-2xl text-[#342c38]">
              {editingId === null ? 'Create artwork' : 'Edit artwork'}
            </h2>

            <p className="mb-7 mt-2 text-sm leading-6 text-[#857b89]">
              New artwork starts as a private draft. Images can be
              added once upload functionality is ready.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="artwork-title"
                  className="mb-2 block text-sm text-[#514653]"
                >
                  Artwork title
                </label>

                <input
                  id="artwork-title"
                  required
                  minLength={2}
                  maxLength={150}
                  value={form.title}
                  onChange={(event) =>
                    setForm({ ...form, title: event.target.value })
                  }
                  className="w-full rounded-xl border border-[#e3dbe5] bg-[#fffdfb] px-4 py-3 text-sm outline-none transition focus:border-[#a994b8] focus:ring-2 focus:ring-[#e8def0]"
                  placeholder="Give your artwork a title"
                />
              </div>

              <div>
                <label
                  htmlFor="artwork-description"
                  className="mb-2 block text-sm text-[#514653]"
                >
                  Description
                </label>

                <textarea
                  id="artwork-description"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={5}
                  value={form.description}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description: event.target.value,
                    })
                  }
                  className="w-full resize-y rounded-xl border border-[#e3dbe5] bg-[#fffdfb] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#a994b8] focus:ring-2 focus:ring-[#e8def0]"
                  placeholder="Tell visitors about the piece..."
                />
              </div>

              <div>
                <label
                  htmlFor="artwork-medium"
                  className="mb-2 block text-sm text-[#514653]"
                >
                  Medium
                </label>

                <input
                  id="artwork-medium"
                  maxLength={100}
                  value={form.medium ?? ''}
                  onChange={(event) =>
                    setForm({ ...form, medium: event.target.value })
                  }
                  className="w-full rounded-xl border border-[#e3dbe5] bg-[#fffdfb] px-4 py-3 text-sm outline-none transition focus:border-[#a994b8] focus:ring-2 focus:ring-[#e8def0]"
                  placeholder="e.g. Oil on canvas"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="artwork-width"
                    className="mb-2 block text-sm text-[#514653]"
                  >
                    Width (cm)
                  </label>

                  <input
                    id="artwork-width"
                    type="number"
                    min="0.01"
                    step="any"
                    value={form.width ?? ''}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        width:
                          event.target.value === ''
                            ? undefined
                            : Number(event.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-[#e3dbe5] bg-[#fffdfb] px-4 py-3 text-sm outline-none transition focus:border-[#a994b8] focus:ring-2 focus:ring-[#e8def0]"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label
                    htmlFor="artwork-height"
                    className="mb-2 block text-sm text-[#514653]"
                  >
                    Height (cm)
                  </label>

                  <input
                    id="artwork-height"
                    type="number"
                    min="0.01"
                    step="any"
                    value={form.height ?? ''}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        height:
                          event.target.value === ''
                            ? undefined
                            : Number(event.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-[#e3dbe5] bg-[#fffdfb] px-4 py-3 text-sm outline-none transition focus:border-[#a994b8] focus:ring-2 focus:ring-[#e8def0]"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-[#65536f] px-6 py-3 text-sm text-white transition hover:bg-[#51415b] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? 'Saving...'
                    : editingId === null
                      ? 'Create draft'
                      : 'Save changes'}
                </button>

                {editingId !== null && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-full border border-[#e3dbe5] px-6 py-3 text-sm text-[#65536f] transition hover:bg-[#f5eff7]"
                  >
                    Cancel editing
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* seller's artwork collection */}
          <section>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="font-serif text-2xl text-[#342c38]">
                Your collection
              </h2>

              <span className="rounded-full bg-[#e8def0] px-3 py-1 text-xs text-[#65536f]">
                {artworks.length} {artworks.length === 1 ? 'piece' : 'pieces'}
              </span>
            </div>

            {loading ? (
              <div className="rounded-3xl border border-[#e6e0e5] bg-white/70 p-8 text-sm text-[#857b89]">
                Loading your artwork...
              </div>
            ) : artworks.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-[#d9cddd] bg-white/50 px-6 py-12 text-center">
                <p className="font-serif text-xl text-[#514653]">
                  Your collection begins here.
                </p>

                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#857b89]">
                  Create your first draft using the form. You can
                  publish it when you're ready.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {artworks.map((artwork) => (
                  <article
                    key={artwork.id}
                    className="rounded-2xl border border-[#e6e0e5] bg-white/80 p-5 shadow-sm"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="break-words font-serif text-xl text-[#342c38]">
                          {artwork.title}
                        </h3>

                        <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-[#77717a]">
                          {artwork.description}
                        </p>

                        {artwork.medium && (
                          <p className="mt-3 text-xs text-[#857b89]">
                            Medium: {artwork.medium}
                          </p>
                        )}

                        {(artwork.width || artwork.height) && (
                          <p className="mt-1 text-xs text-[#857b89]">
                            Dimensions: {artwork.width ?? '—'} ×{' '}
                            {artwork.height ?? '—'} cm
                          </p>
                        )}
                      </div>

                      <span className="shrink-0 rounded-full bg-[#f0e9f3] px-3 py-1 text-xs text-[#65536f]">
                        {statusLabels[artwork.status]}
                      </span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2 border-t border-[#eee7ef] pt-4">
                      <button
                        type="button"
                        onClick={() => startEditing(artwork)}
                        className="rounded-full border border-[#e3dbe5] px-4 py-2 text-xs text-[#65536f] transition hover:bg-[#f5eff7]"
                      >
                        Edit
                      </button>

                      {artwork.status === 'DRAFT' && (
                        <button
                          type="button"
                          onClick={() =>
                            changeStatus(artwork, 'PUBLISHED')
                          }
                          className="rounded-full bg-[#65536f] px-4 py-2 text-xs text-white transition hover:bg-[#51415b]"
                        >
                          Publish
                        </button>
                      )}

                      {artwork.status === 'PUBLISHED' && (
                        <button
                          type="button"
                          onClick={() =>
                            changeStatus(artwork, 'ARCHIVED')
                          }
                          className="rounded-full border border-[#e3dbe5] px-4 py-2 text-xs text-[#65536f] transition hover:bg-[#f5eff7]"
                        >
                          Archive
                        </button>
                      )}

                      {artwork.status === 'ARCHIVED' && (
                        <button
                          type="button"
                          onClick={() =>
                            changeStatus(artwork, 'DRAFT')
                          }
                          className="rounded-full border border-[#e3dbe5] px-4 py-2 text-xs text-[#65536f] transition hover:bg-[#f5eff7]"
                        >
                          Restore to drafts
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDelete(artwork)}
                        className="rounded-full px-4 py-2 text-xs text-[#9a5555] transition hover:bg-[#fbefed]"
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}