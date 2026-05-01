from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class RoleConfig:
    name: str
    instructions_file: str
    sandbox: str
    extra_docs: tuple[str, ...] = ()
    allowed_roots: tuple[str, ...] = ()


ROLE_CONFIGS: dict[str, RoleConfig] = {
    "planner": RoleConfig(
        name="planner",
        instructions_file="agents/planner/planner.md",
        sandbox="read-only",
        extra_docs=("agents/agent_board.md", "agents/decisions.md", "agents/rules.md"),
    ),
    "frontend": RoleConfig(
        name="frontend",
        instructions_file="agents/frontend/frontend.md",
        sandbox="workspace-write",
        extra_docs=("agents/agent_board.md", "agents/decisions.md", "agents/rules.md"),
        allowed_roots=("react_frontend",),
    ),
    "backend": RoleConfig(
        name="backend",
        instructions_file="agents/backend/backend.md",
        sandbox="workspace-write",
        extra_docs=("agents/agent_board.md", "agents/decisions.md", "agents/rules.md"),
        allowed_roots=("django_backend",),
    ),
    "reviewer": RoleConfig(
        name="reviewer",
        instructions_file="agents/reviewer/reviewer.md",
        sandbox="read-only",
        extra_docs=("agents/agent_board.md", "agents/decisions.md", "agents/rules.md"),
    ),
    "integrator": RoleConfig(
        name="integrator",
        instructions_file="agents/integrator/integrator.md",
        sandbox="read-only",
        extra_docs=("agents/agent_board.md", "agents/decisions.md", "agents/rules.md"),
    ),
}

ROLE_ORDER = list(ROLE_CONFIGS.keys())


def resolve_role_config(role_name: str) -> RoleConfig:
    return ROLE_CONFIGS.get(
        role_name,
        RoleConfig(
            name=role_name,
            instructions_file=f"agents/{role_name}/{role_name}.md",
            sandbox="read-only",
            extra_docs=("agents/agent_board.md", "agents/decisions.md", "agents/rules.md"),
        ),
    )
