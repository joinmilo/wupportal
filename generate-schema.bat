@echo off

setlocal

set "folder=%~1"

echo [Start] generating
for /r "%folder%" %%F in (*codegen.ts) do (
  echo [Running] graphql-codegen for %%F
  graphql-codegen --config "%%F"
)
echo [Stop] generating

endlocal