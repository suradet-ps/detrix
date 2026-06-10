<script lang="ts">
  import type { PageProps } from './$types';
  import type { PortfolioItem } from '$lib/types/portfolio';
  import Hero from '$lib/components/Hero.svelte';
  import EditorialSection from '$lib/components/EditorialSection.svelte';
  import SignatureSection from '$lib/components/SignatureSection.svelte';
  import ProjectFeatured from '$lib/components/ProjectFeatured.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import SpeakerSection from '$lib/components/SpeakerSection.svelte';
  import AcademicSection from '$lib/components/AcademicSection.svelte';
  import InnovationSection from '$lib/components/InnovationSection.svelte';
  import Timeline from '$lib/components/Timeline.svelte';
  import TestimonialSection from '$lib/components/TestimonialSection.svelte';
  import CTABand from '$lib/components/CTABand.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import SectionReveal from '$lib/components/SectionReveal.svelte';

  let { data }: PageProps = $props();

  let editorial = $derived(data.editorial);
  let loadError = $derived(data.error);

  let isModalOpen = $state(false);
  let selectedItem = $state<PortfolioItem | null>(null);

  function openModal(item: PortfolioItem): void {
    selectedItem = item;
    isModalOpen = true;
  }

  function closeModal(): void {
    isModalOpen = false;
    selectedItem = null;
  }
</script>

{#if loadError}
  <div class="state-error" role="alert">{loadError}</div>
{:else if editorial}
  {#if editorial.items.length === 0}
    <div class="state-empty">
      <p>No portfolio items yet.</p>
      <a href="/add" class="btn-primary">Add your first item</a>
    </div>
  {:else}
    {#each [editorial] as ed}
      <!-- 1. Hero — White Surface -->
      <SectionReveal>
        <Hero metrics={ed.metrics} />
      </SectionReveal>

      <!-- 2. Professional Identity — Coral Signature -->
      <SectionReveal>
        <SignatureSection
          id="identity"
          surface="coral"
          label="Professional Identity"
          headline="Clinical Pharmacist &amp; Healthcare Innovator"
          supporting="Transforming healthcare delivery through evidence-based practice, education, and innovation at Saraburi Provincial Hospital."
        >
          <div class="identity-content">
            <p class="identity-text">
              With a career spanning clinical practice, academic research, public health advocacy,
              and healthcare innovation, I bring a multidisciplinary approach to improving patient
              outcomes across Thailand's healthcare system.
            </p>
          </div>
        </SignatureSection>
      </SectionReveal>

      <!-- 3. Signature Projects — White Surface -->
      <SectionReveal>
        <EditorialSection id="projects" label="Signature Projects">
          {#if ed.flagshipProject}
            <div class="projects-flagship">
              <ProjectFeatured item={ed.flagshipProject} />
            </div>
          {/if}

          <div class="projects-grid">
            {#each ed.innovationItems.slice(0, 4) as item, i (item.id)}
              <div class="project-cell" class:project-cell--offset={i % 2 === 1}>
                <ProjectCard {item} onclick={() => openModal(item)} />
              </div>
            {/each}
          </div>
        </EditorialSection>
      </SectionReveal>

      <!-- 4. Speaker Experience — Cream Surface -->
      {#if ed.speakerItems.length > 0}
        <SectionReveal>
          <EditorialSection id="speaker" surface="cream" label="Speaker Experience">
            <SpeakerSection items={ed.speakerItems} />
          </EditorialSection>
        </SectionReveal>
      {/if}

      <!-- 5. Academic Contributions — Dark Surface -->
      {#if ed.academicItems.length > 0}
        <SectionReveal>
          <SignatureSection
            id="academic"
            surface="dark"
            label="Academic Contributions"
            headline="Research &amp; Publications"
            supporting="Contributing to the body of knowledge in clinical pharmacy and public health."
          >
            <AcademicSection items={ed.academicItems} />
          </SignatureSection>
        </SectionReveal>
      {/if}

      <!-- 6. Healthcare Innovations — White Surface -->
      {#if ed.innovationItems.length > 0}
        <SectionReveal>
          <EditorialSection id="innovations" label="Healthcare Innovations">
            <InnovationSection items={ed.innovationItems} />
          </EditorialSection>
        </SectionReveal>
      {/if}

      <!-- 7. Career Timeline — Soft Surface -->
      {#if ed.allTimeline.length > 0}
        <SectionReveal>
          <EditorialSection id="timeline" surface="soft" label="Career Timeline">
            <Timeline entries={ed.allTimeline} />
          </EditorialSection>
        </SectionReveal>
      {/if}

      <!-- 8. Recognition — Mint Signature -->
      <SectionReveal>
        <SignatureSection
          id="recognition"
          surface="mint"
          label="Recognition"
          headline="Professional Impact"
          supporting="Committed to advancing healthcare through continuous learning, teaching, and innovation."
        >
          <TestimonialSection>
            <article class="recognition-card">
              <p class="recognition-stat">{ed.metrics.academicWorks}+</p>
              <p class="recognition-label">Academic Works Published</p>
            </article>
            <article class="recognition-card">
              <p class="recognition-stat">{ed.metrics.speakerSessions}+</p>
              <p class="recognition-label">Speaker Sessions Delivered</p>
            </article>
            <article class="recognition-card">
              <p class="recognition-stat">{ed.metrics.innovations}+</p>
              <p class="recognition-label">Healthcare Innovations</p>
            </article>
          </TestimonialSection>
        </SignatureSection>
      </SectionReveal>

      <!-- 9. CTA — Dark Surface -->
      <SectionReveal>
        <CTABand
          headline="Let's work together to advance healthcare"
          supporting="Have a project, speaking opportunity, or research collaboration in mind?"
          label="Get in touch"
        />
      </SectionReveal>
    {/each}
  {/if}
{/if}

{#if isModalOpen && selectedItem}
  <Modal item={selectedItem} onclose={closeModal} />
{/if}

<style>
  .state-error {
    padding: var(--space-xxl);
    text-align: center;
    color: var(--color-body);
    font-size: var(--text-body-md);
  }

  .state-empty {
    padding-block: var(--space-section);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-lg);
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    padding: var(--space-md) var(--space-lg);
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    font-size: var(--text-button);
    font-weight: var(--text-button-weight);
    line-height: var(--text-button-line);
    border-radius: var(--radius-lg);
    text-decoration: none;
    border: none;
    cursor: pointer;
  }

  .btn-primary:focus-visible {
    outline: 2px solid var(--color-info-border);
    outline-offset: 2px;
  }

  .identity-content {
    max-inline-size: 640px;
  }

  .identity-text {
    font-size: var(--text-title-md);
    font-weight: var(--text-title-md-weight);
    line-height: var(--text-title-md-line);
    opacity: 0.9;
  }

  .projects-flagship {
    margin-block-end: var(--space-xxl);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-lg);
  }

  .project-cell {
    display: flex;
  }

  .project-cell--offset {
    padding-block-start: var(--space-xl);
  }


  .recognition-card {
    padding: var(--space-xl);
    background-color: var(--color-canvas);
    border: 1px solid var(--color-hairline);
    border-radius: var(--radius-md);
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    align-items: center;
  }

  .recognition-stat {
    font-size: var(--text-display-md);
    font-weight: var(--text-display-md-weight);
    line-height: var(--text-display-md-line);
    color: var(--color-ink);
  }

  .recognition-label {
    font-size: var(--text-caption);
    font-weight: var(--text-caption-weight);
    letter-spacing: var(--text-caption-spacing);
    color: var(--color-muted);
  }

  @media (max-inline-size: 1024px) {
    .projects-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-inline-size: 768px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
