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
        instructions_file="md/planner.md",
        sandbox="read-only",
        extra_docs=("md/agent_board.md", "md/decisions.md"),
    ),
    "frontend": RoleConfig(
        name="frontend",
        instructions_file="md/frontend.md",
        sandbox="workspace-write",
        extra_docs=("md/agent_board.md", "md/decisions.md"),
        allowed_roots=("react_frontend",),
    ),
    "backend": RoleConfig(
        name="backend",
        instructions_file="md/backend.md",
        sandbox="workspace-write",
        extra_docs=("md/agent_board.md", "md/decisions.md"),
        allowed_roots=("django_backend",),
    ),
    "reviewer": RoleConfig(
        name="reviewer",
        instructions_file="md/reviewer.md",
        sandbox="read-only",
        extra_docs=("md/agent_board.md", "md/decisions.md"),
    ),
    "integrator": RoleConfig(
        name="integrator",
        instructions_file="md/integrator.md",
        sandbox="read-only",
        extra_docs=("md/agent_board.md", "md/decisions.md"),
    ),
}

ROLE_ORDER = list(ROLE_CONFIGS.keys())


def resolve_role_config(role_name: str) -> RoleConfig:
    return ROLE_CONFIGS.get(
        role_name,
        RoleConfig(
            name=role_name,
            instructions_file=f"md/{role_name}.md",
            sandbox="read-only",
            extra_docs=("md/agent_board.md", "md/decisions.md"),
        ),
    )
