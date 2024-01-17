import random

import requests

ANON_API_KEY = "0000000000"
STABLE_HORDE_URL = "https://stablehorde.net/api/v2"

DEFAULT_GENERATION_PAYLOAD = {
    "params": {
        "sampler_name": "k_dpm_2_a",
        "cfg_scale": 7.5,
        "denoising_strength": 0.75,
        "seed": str(random.randint(0, 999999)),
        "height": 512,
        "width": 512,
        "seed_variation": 1,
        "post_processing": ["GFPGAN"],
        "karras": False,
        "tiling": False,
        "hires_fix": False,
        "clip_skip": 1,
        "steps": 20,
        "n": 1,
    },
    "nsfw": False,
    "censor_nsfw": True,
    "disable_batching": False,
}

headers = {"apikey": ANON_API_KEY, "Client-Agent": "unknown:0:unknown"}


async def generate_async(prompt: str) -> str:
    payload = dict(DEFAULT_GENERATION_PAYLOAD)
    payload["prompt"] = prompt

    r = requests.post(
        f"{STABLE_HORDE_URL}/generate/async", json=payload, headers=headers
    )
    data = r.json()

    return data["id"]


async def generate_status(id: str):
    r = requests.get(f"{STABLE_HORDE_URL}/generate/status/{id}", headers=headers)
    data = r.json()

    return data
