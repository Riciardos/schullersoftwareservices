import { Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  BuildInfoContainer,
  Label,
  Row,
  ScoreCard,
  ScoreCircle,
  ScoreLabel,
  ScoresRow,
  StatusDot,
} from './BuildInfo.styles';

interface WorkflowRun {
  display_title: string;
  status: string;
  conclusion: string;
  updated_at: string;
  html_url: string;
}

interface LighthouseScores {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  timestamp: string;
}

const REPO = 'Riciardos/schullersoftwareservices';
const WORKFLOW = 'deploy.yml';

const statusMap = {
  in_progress: "In progress",
  finished: "Finished"
}

const timeAgo = (iso: string) => {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

function BuildInfo() {
  const [run, setRun] = useState<WorkflowRun | null>(null);
  const [scores, setScores] = useState<LighthouseScores | null>(null);

  useEffect(() => {
    fetch(
      `https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW}/runs?per_page=1&branch=main`
    )
      .then((r) => r.json())
      .then((d) => setRun(d.workflow_runs?.[0] ?? null))
      .catch(() => {});

    fetch('/lighthouse-scores.json')
      .then((r) => r.json())
      .then(setScores)
      .catch(() => {});
  }, []);

  const success = run?.conclusion === 'success';

  return (
    <BuildInfoContainer>
      <Row>
        <Label>Build</Label>
        {run ? (
          <Row>
            <StatusDot success={success} />
            <Typography variant="body2" sx={{ maxWidth: 300, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              <Link href={run.html_url} target="_blank" rel="noreferrer" color="inherit">
                {success ? 'Passing' : run.conclusion}
              </Link>
              {' · '}
              {`Last commit message: ${run.display_title}  · ` }
            </Typography>
            <Typography variant="body2">
              {timeAgo(run.updated_at)}
            </Typography>
          </Row>
        ) : (
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            Loading…
          </Typography>
        )}
      </Row>

      <Row>
        <Label>Stack</Label>
        <Typography variant="body2">
          React · Micronaut 4 · Java 21 · AWS Lambda · DynamoDB · Terraform
        </Typography>
      </Row>

      <Row>
        <Label>Lighthouse</Label>
        {scores ? (
          <ScoresRow>
            {[
              { label: 'Performance', value: scores.performance },
              { label: 'Accessibility', value: scores.accessibility },
              { label: 'Best Practices', value: scores.bestPractices },
              { label: 'SEO', value: scores.seo },
            ].map(({ label, value }) => (
              <ScoreCard key={label}>
                <ScoreCircle score={value}>{value}</ScoreCircle>
                <ScoreLabel>{label}</ScoreLabel>
              </ScoreCard>
            ))}
          </ScoresRow>
        ) : (
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            Loading…
          </Typography>
        )}
      </Row>

      {scores && (
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
          Lighthouse last run {timeAgo(scores.timestamp)}
        </Typography>
      )}
    </BuildInfoContainer>
  );
}

export default BuildInfo;
