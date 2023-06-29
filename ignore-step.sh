#!/bin/bash
# defines which branches should be built by Vercel on push

if [[ "$VERCEL_GIT_COMMIT_REF" == "develop" || "$VERCEL_GIT_COMMIT_REF" == "main"  ]] ; then
  echo "✅ - Build can proceed"
  exit 1;

else
  echo "🛑 - Build cancelled"
  exit 0;
fi